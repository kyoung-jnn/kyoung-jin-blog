---
title: 브라우저 CSS Animation의 동작 과정
date: '2022-07-20'
summary: Google web dev, Animation 파트를 보고 간략히 정리를 해보았습니다.
publish: true
---

# 🐢 왜 애니메이션이 느리게 느껴질까...

## 들어가기전

<Image auto src={'/posts/2022/07/web-dev-animation/jank.png'} />

최신 브라우저들은 `transform` & `opacity` **같은 CSS 프로퍼티**들을 이용한 애니메이션을 빠르게 수행하지만

그 외의 프로퍼티들을 이용한 애니메이션은 매끄럽게, **60FPS**로 수행하지는 않습니다.

스크린이 **Update** & **Repaint** 되는 각각의 프레임으로 동작하는 웹 특성상,
한 프레임에서 `16.7ms(0.0167초)`안에 모든 작업이 이루어지지 않으면 사용자는 **딜레이 (Jank)** 가 생겼다고 느낄수가 있습니다!

> 1000ms / 60FPS = 약 16.7ms

## Rendering pipeline

브라우저에서 요소를 스크린에 표현하기 위해서는 `Rendering pipeline`라는 **순차적** 단계를 거칩니다.

- **Style**: 요소들에 적용된 스타일들 계산하기
- **Layout**: 각가의 요소의 **위치(x, y)** 요소들 설정하기
- **Paint**: 요소들이 갖고있는 픽셀들을 **Layers에 그리기**
  - **Layer**: **요소들이 그룹화**되어 있는 부분, Photoshop 레이어와 아이디어가 비슷하다.
- **Composite**: **Layers**를 합성해서 **스크린에 그리기**

### Layout 애니메이션

`Layout`은 **위치(x, y)** & **사이즈** 변화에 영향을 받습니다.<br/>
하나의 요소의 위치, 사이즈가 변하게 된다면 자연스럽게 **다른 요소들의 Layout**도 `Recalculate`되는 현상이 발생합니다.

> 결국 요소들이 많게 될수록 layout에 시간을 많이 쏟게 됌!

### Paint 애니메이션

요소들이 어떤 `Layers`에 있으냐에 따라서 해당 요소가 다른 요소에 의해 다시 **Paint** 될 수도 있습니다.

> pipeline 과정중 가장 긴 시간이기도 합니다.

### Composite 애니메이션

`Composite` 는 Paint에서 생성된 Layer들을 픽셀 정보로 바꾸는 레스터화 (Rasterization), 합성하는 단계로 구성됩니다.

애니메이션을 실행하기 위해서는 결국 위 단계들을 처음부터 다시 반복해야 하는데 <br/>
**순차적** 특성상, **Layout**만 바뀌어도 **Paint**, **Composite**까지 실행되어야 합니다. 😫

> https://csstriggers.com/ 사이트에서 각 엔진마다 CSS 프로퍼티들의 렌더 단계를 볼 수 있다.

## Layer

**Paint** 단계에서 생성된 `Layers`을 통해
다른 요소들의 **Layout**과 상관 없이 자신의 `Layer`에서만 다시 **Repaint** 작업을 할 수 있습니다.

이를 수동(강제)으로는 `will-change`를 통해서 `Layer` 생성을 할 수 있습니다. (Force layer creation)

```css
body > .sidebar {
  will-change: transform;
}
```

```css
// 이렇게는 하지 말자..
*,
*::before,
*::after {
  will-change: all;
}
```

<br />
`will-change`, **이름** 그대로 이를 사용하기 위해서는 브라우저에게 **숨 좀 돌릴 수
있는 시간**이 필요합니다. 😮‍💨

```css
.element:hover {
  will-change: transform;
  transition: transform 2s;
  transform: rotate(30deg) scale(1.5);
}
```

위와 같이 있을때 브라우저는 **will-change**의 존재 여부와 동시에 애니메이션을 실행하게 됩니다.<br/>

```css
.element {
  /* style rules */
  transition: transform 1s ease-out;
}
.element:hover {
  will-change: transform;
}
.element:active {
  transform: rotateY(180deg);
}
```

따라서 위와 같이 사용자가 hover하고 클릭할 때까지 시간동안 <br/> 애니메이션이 일어나기전에 브라우저가 `will-change`의 존재를 알고 스스로 최적화를 하도록 해줍니다.

하지만, `Layer`는 **GPU** 자원을 사용하므로 아무래도 **추가 연산 & 자원**이 소모되기 때문에 **꼭 필요한 상황**에서만 사용해야 합니다!
만약 `will-change`를 통한 작업이 꼭 필요한 상황이라면 해당 작업이 끝난 뒤에 해제를 시켜줘야 합니다!

> 계속 사용되는 인터렉션은 유지, 예를 들어 **Sidebar**

```js
var el = document.getElementById('element');

el.addEventListener('mouseenter', hintBrowser);
el.addEventListener('animationEnd', removeHint);

function hintBrowser(event) {
  event.target.style.willChange = 'transform, opacity';
}

function removeHint(event) {
  // 해제 해주자
  event.target.style.willChange = '';
}
```

`wiil-change`에 관한 자세한 좋은 아티클은 [여기](https://dev.opera.com/articles/css-will-change-property/)

> **IE**같이 `will-change` 지원이 안되는 브라우저는 `transform: translateZ(0)` 통해서 생성 가능.. <br/>
> 그냥 이제는 편히 보내주자 🪦

## 그래서 애니메이션이 왜 느려지냐고...🧐

<Image auto src={'/posts/2022/07/web-dev-animation/thread.png'} />

CSS 기반 애니메이션과 [Web Animation API](https://www.w3.org/TR/web-animations-1/)는 `Compositor Thread` 에서 발생합니다.

하지만 **JS**, **Rendering pipeline**등 작업은 `Main Thread` 에서 실행!

따라서 `Compositor Thread`를 이용하지 않는 **애니메이션들**은 다른 작업들과 같이 이루어지는 `Main Thread`에서 작동하므로 느려질수 밖에 없습니다. (FPS가 떨어진다. 🔫)

**결국** 대부분의 애니메이션을 `Compositor Thread`를 사용하는 `transform`, `rotate`, `opacity`으로 구현하면 딜레이 없이 애니메이션 구현이 가능해집니다.

### 이동관련

`transform`의 `translate`, `rotate` 를 사용하자

```css
// 멀리 이동하기~
.animate {
  animation: slide-in 0.7s both;
}

@keyframes slide-in {
  0% {
    transform: translateY(-1000px);
  }
  100% {
    transform: translateY(0);
  }
}
```

```css
// 제자리 돌리기~
.animate {
  animation: rotate 0.7s ease-in-out both;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### 크기관련 & 가시성관련

`transform`의 `scale` & `opacity`을 사용하자

```css
// 크기 스케일 업, 다운
.animate1 {
  animation: scale 1.5s both;
}

@keyframes scale {
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

.animate2 {
  animation: opacity 2.5s both;
}
```

```css
// 가시성
@keyframes opacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

# 📝 결론

- **Layout, Paint**를 다시 작동시키지 말자
- **Compositor Thread**를 이용한 애니메이션을 사용하면 좋다! Block이 안생기니까
- **will-change**를 통해서 **Layer**를 강제로 만들 수 있다.
- 하지만 **Layer**는 양날의 검이다 🗡

---

> 참고 | [web.dev-animation](https://web.dev/animations/), [d2](https://d2.naver.com/helloworld/2061385?source=post_page---------------------------)
