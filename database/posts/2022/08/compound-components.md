---
title: React, Compound Components (컴파운드 컴포넌트 패턴)
date: '2022-08-26'
summary: React의 컴포넌트 디자인 패턴
publish: false
---

# Compound Components Pattern

`Compound Components 패턴`은 **React**의 컴포넌트 디자인 패턴중 한가지 입니다.

해당 패턴은 내부 로직들은 외부로 부터 감춰 `추상화`하고 로직에 필요한 `state`는 내부에서 공유하는 형식입니다. 😏

이를 통해 **새로운 UI 컴포넌트**가 추가되는 상황에서 `state`를 공유하기 때문에 컴포넌트 스타일링 추가에 유연하고 대처하여 쉽게 확장 할 수 있게 됩니다.

> 프로젝트 구조에 `Atomic Design 패턴`을 적용하는 경우 <br/> **organism**, **module** 컴포넌트 정도에 `Compound Components 패턴`을 사용할 수 있겠네요. 🧐

## 예시

토글 스위치 컴포넌트를 만들어봅시다.

#### 1. 내부 로직 추상화

#### 2. 내부 프로퍼티로 컴포넌트 지정하기

#### 3. 완성! 👏

```javascript
function App() {
  return (
    <Toggle onToggle={(on) => console.log(on)}>
      <Toggle.ToggleOn>The button is on</Toggle.ToggleOn>
      <Toggle.ToggleOff>The button is off</Toggle.ToggleOff>
      <Toggle.ToggleButton />
    </Toggle>
  );
}
```

위와 같은 Toogle 컴포넌트가 존재할때

> 참고 [아티클](https://kentcdodds.com/blog/compound-components-with-react-hooks)
