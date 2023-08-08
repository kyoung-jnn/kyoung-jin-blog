---
title: FID를 대체할 INP(Interaction to Next Paint)를 알아보자
date: 2023-08-05
summary: Core Web Vitals, INP (Interaction to Next Paint)
publish: true
---

> Core Web Vitals 포스팅 [보러가기](https://kyoung-jnn.com/posts/web-vitals)

**Google Chrome**팀에서 웹 페이지 사용자 경험을 측정하기 위해 `Web Vitals`를 도입했다. 하위 개념으로 3가지 중요한 메트릭을 `Core Web Vitals`라고 한다.

Chrome 사용 데이터를 따르면 페이지에서 사용자 시간의 90%는 **페이지가 로드된 후** 소비된다고 한다. 따라서 상호작용 응답성을 측정하고 단축하는 건 페이지를 구현함에 있어서 큰 목표이다.

`Core Web Vitals`에서는 사용자의 `상호작용 응답성`을 측정하기 위해 [FID(First Input Delay)](https://web.dev/fid/)를 한다. 하지만 **FID** 측정에는 **제한사항**이 존재헀다고 한다.

**1. 첫번째 입력**

FID는 사용자의 **첫번째 상호작용만** 측정하기 때문에 페이지의 전체 수명 동안 모든 상호작용을 나타내는 지표가 되지 못 한다.

**2. 지연**

FID는 이벤트 처리의 **지연**만 측정하기 때문에 이벤트 처리 시간 자체나 브라우저에서 이벤트 핸들러를 실행한 후 UI를 업데이트하는 데 걸리는 시간은 측정하지 않는다.

# INP(Interaction to Next Paint)의 등장

<Image src='/posts/2023/08/interaction-to-next-paint/inp-timeline.png' auto/>

이를 해결하기 위해, 2022년 구글은 [INP(Interaction to Next Paint)](https://web.dev/inp/)라는 지표를 [발표](https://web.dev/inp-cwv/?hl=ko)한다. 이는 2024년 3월부터 Core Web Vitals의 **FID**를 **대체** 할 예정이다.

# INP란?

사용자가 웹 페이지를 방문하면서 발생시킬 수 있는 모든 `상호작용`들을 관찰하여 **페이지 전반적인 상호작용 반응성을 평가하는 지표**이다.

**INP**는 **첫번째 상호작용을 포함한 모든 상초작용들을 측정**하여 페이지 전체 수명동안 가장 느린 상호작용을 기준으로 삼는다. 또한 상호작용이 시작되면 이벤트 핸들링과 브라우저가 다음 프레임을 그리기전(Paint 전)까지 과정을 측정으로 삼는다.

결국, **INP**를 통해 이뤄야 할 목표는 사용자가 수행하는 모든 상호 작용에 대해 `상호 작용이 시작한 때부터 다음 프레임이 그려질 때까지의 시간`을 가능한 한 짧게 만드는 것.

<Video src='/posts/2023/08/interaction-to-next-paint/inp-vido.mp4' />

# INP 점수 측정하기

<Image src='/posts/2023/08/interaction-to-next-paint/inp-metric.png' auto/>

- **200ms** 이하인 경우 페이지의 응답성이 좋다!
- **200ms** 초과, **500ms** 미만인 경우 페이지의 응답성이 개선되어야 한다
- **500ms** 이상인 경우 페이지의 응답성이 낮다.

점수 측정에 있어서 사용자 **환경의 변동성**(장치, 네트워크)이 있을 수 있고, 웹 페이지의 **상호작용 빈도**(횟수) 및 예기치 않은 페이지 **지연 증가**등의 예외 상황이 발생하는 것을 고려해야한다.

따라서 최악의 상호작용 상황(가장 높은 INP 값)에 무조건 초점을 맞추면 공평하지 않은 결과가 나올 수 있다. Google에서는 이러한 상황을 방지하기 위해 `75번째 백분위수`로 측정하는 것이 좋은 값이라고 소개하고 있다.

# 상호작용의 구성

<Image src='/posts/2023/08/interaction-to-next-paint/interaction-single.svg' auto/>

<Image src='/posts/2023/08/interaction-to-next-paint/interaction-multi.svg' auto/>

# INP 점수 측정 방법

INP를 알아보는 방법에는 현장 측정과 실험실 측정이 있습니다. 현장 측정은 웹사이트 방문자의 실제 데이터를 활용하는 방식이고 실험실 측정은 기기, 네트워크 상태 등 테스트 환경을 사전에 만들어 둔 뒤 데이터를 수집하는 방식입니다.

두 방법 중 실제 사용자의 데이터를 활용하는 현장 측정방식 사용을 권장하며 테스트를 위한 몇 가지 툴을 아래에 소개합니다.

## 현장

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome 사용자 경험 보고서 (CrUX)](https://developer.chrome.com/docs/crux/)
  - **CrUX**에 자신의 웹페이지 데이터가 존재한다면 **PageSpeed Insights**에서 빠르게 확인이 가능하다고 하니 Big Query를 다루지 않는 이상 쉽게 사용하지는 못 할 듯하다.
- [Web Vitals JavaScript library](https://github.com/GoogleChrome/web-vitals/tree/next)

## 실험실

상호 작용이 느린 경우가 없을 경우 실험실 기능들을 사용한다.

- 개발자 도구 Lighthouse **Timespan mode**
  - 사용자가 정의한 시간 동안 분석하는 mode
- [Web Vitals Chrome 확장 프로그램](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma?hl=en)
