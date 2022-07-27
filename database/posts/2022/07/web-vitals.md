---
title: Core Web Vitals이란? LCP FID CLS
date: '2022-07-26'
summary: Google web dev, Core Web Vitals에 대해서 정리를 해보았습니다.
publish: true
---

# Web Vitals

웹 사이트를 제작하면서 사용자 경험을 좋게 만드는 것은 가장 중요합니다.

개발자를 비롯한 다양한 사람들이 웹의 개선할 항목을 확인하고 성능을 쉽게 개선 할 수 있게
**구글**은 `Web Vitals`라는 도구(프로그램)을 만들고 아래와 같이 정의하고 있습니다.

> **Web Vitals**는 웹에서 우수한 사용자 경험을 제공하는 데 필수적인 품질 신호에 대한 통합 지침을 제공하기 위한 Google의 이니셔티브입니다.

<br/>

> 한마디로 웹 성능을 측정하는 도구이다~😎

# Core Web Vitals

그 중 `Web Vitals`의 하위 개념으로 `Core Web Vitals`이 존재합니다.

모든 웹 사용자 경험에서 공통적으로 필요한 **3가지 요소(메트릭스)를 핵심 지표**로 `Core` 라고 지칭하고 있습니다.

> 해당 지표들은 모두 낮을수록 좋습니다.

## LCP

<Image src={'/posts/2022/07/web-vitals/lcp.svg'} auto/>

`LCP`는 **Largest Contentful Paint**를 의미합니다.

페이지가 처음 로드되고 뷰포트 내에서 `메인 콘텐츠`가 사용자에게 로드 되었다고 판별한 시간을 의미하게 됩니다.
여기서 `메인 콘텐츠`는 **이미지, 비디오, 블록 요소 (div, p, section, main)** 들을 지칭하게 됩니다.

<Image src={'/posts/2022/07/web-vitals/fcp-lcp.png'} auto/>

페이지가 로드되면서 점진적으로 `LCP`가 결정이 될 수도 있습니다!

## FID / First Input Delay

<Image src={'/posts/2022/07/web-vitals/fid.svg'} auto/>

`FID`는 **First Input Delay**를 의미합니다.

**사용자**는 웹 페이지에 들어오고 링크, 버튼 클릭등 **JavaScript**를 이용하는 **상호 작용**을 합니다.

브라우저의 `메인 스레드`가 다른 작업을 진행중이면 사용자의 상호작용은 처리할 수 없으므로
해당 상호 작용은 `지연`이 되며 결국 나중에 핸들링이 되게 됩니다.
`FID`는 이러한 시간을 지칭하게 됩니다.

> **즉**, 사용자가 페이지와 처음 상호작용(클릭등) 시작 후 해당 상호작용이 사용자에게 반응되는 시간으로 볼 수 있겠네요.

`FID`가 증가하는 주된 원인은 브라우저가 로드한 **JavaScript** 파일 분석 및 실행에 연관되어 있습니다.
메인 스레드가 로드된 **JS** 작업들을 하는동안 사용자 상호작용을 무시해버리니까요! 🙄

> **FID**에는 실제 사용자가 필요하기 때문에 **[TBT](https://web.dev/tbt/)(FCP와 TTI 사이 시간)** 개선을 하면 자연스럽게 개선이 된다고 하네요.

## CLS / Cumulative Layout Shift

<Image src={'/posts/2022/07/web-vitals/cls.svg'} auto/>

`CLS`는 **Cumulative Layout Shift**를 의미합니다. **시작적 안정성**을 측정할 때 중요한 지표로 활용이 됩니다.

<Image src={'/posts/2022/07/web-vitals/cls-example.gif'} auto/>

> 빡침이 느껴지는 클릭 🤬

우리는 원하는 정보가 있는 사이트에 접근해서 정보를 읽고 있는데, 뜬금 없이 **광고**가 생겨 **우리가 읽고 있던 정보가 갑자기 아래로 내려가는 경험**을 몇 번 해봤습니다.

위와 같은 상황에서 갑작스럽게 발생하는 `레이아웃 이동` 중 **가장 큰 이동 거리**를 계산하여 `CLS` 지표로 사용합니다.

> **레이아웃 이동**은 시각적 요소가 렌더링된 프레임(시작 위치)에서 다음 프레임으로 위치(갑자기 이동한 위치)를 변경할 때마다 발생합니다.

정확히 `CLS`는 **impact fraction** \* **distance fraction** 란 **공식**을 갖고있습니다. 😵‍💫

- **impact fraction**: 원래 위치에서 움직인 위치까지 화면에서 차지하는 정도
- **distance fraction**: 원래 위치에서 움직인 위치까지 거리

<Image src={'/posts/2022/07/web-vitals/cls-cal.png'} auto/>

위와 같이 요소가 `뷰포트`의 **50%** 정도를 차지하고 있을 때, 오른쪽 같이 **25%** 정도 아래로 **Layout Shift**가 발생한 상황에서

- **impact fraction**: 50% + 25% = 75% (0.75)
- **distance fraction**: 25% (0.25)

따라서 `CLS`는 **0.75** \* **0.25** = `0.1875` 가 되게 됩니다.

> **단**, 여기서 사용자의 상호작용으로 인한 레이아웃 변경, 애니메이션을 통한 레이아웃 변경은 CLS 측정에서 제외됩니다.

---

> 참고 | [web.dev](https://web.dev/vitals/)
