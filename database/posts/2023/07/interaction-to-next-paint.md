---
title: FID를 대체할 INP(Interaction to Next Paint)를 알아보자
date: 2023-08-05
summary: Core Web Vitals, INP (Interaction to Next Paint)
publish: true
---

**Google Chrome**팀에서 웹페이지 사용자 경험을 측정하기 위해 `Core Web Vitals`를 도입했다.

> Core Web Vitals 포스팅 [보러가기](https://kyoung-jnn.com/posts/web-vitals)

사용자의 `상호작용 응답성`을 측정하기 위해서는 Core Web Vitals중 [FID(First Input Delay)](https://web.dev/fid/)를 사용했었다. 하지만 FID 측정 **제한사항**이 존재헀다고 한다.

**1. 첫번째 입력**

FID는 사용자의 **첫번째 상호작용만** 측정하기 때문에 페이지의 전체 수명 동안 모든 상호작용을 나타내는 지표가 되지 못 한다.

**2. 지연**

FID는 이벤트 처리의 **지연**만 측정하기 때문에 이벤트 처리 시간 자체나 브라우저에서 이벤트 핸들러를 실행한 후 UI를 업데이트하는 데 걸리는 시간은 측정하지 않는다.

# INP(Interaction to Next Paint)의 등장

<Image src='/posts/2023/08/interaction-to-next-paint/inp-timeline.png' auto/>

> 2022년, 구글은 [INP(Interaction to Next Paint)](https://web.dev/inp/)라는 지표를 [발표](https://web.dev/inp-cwv/?hl=ko)합니다. 이는 2024년 3월부터 Core Web Vitals의 FID를 대체 할 예정입니다.

FID와 반대로 INP는 **첫번째 상호작용을 포함한 모든 상초작용들을 측정**하여 페이지 전체 수명동안 가장 느린 상호작용을 기준으로 삼는다. 또한 상호작용이 시작되면 이벤트 핸들링과 브라우저가 다음 프레임을 그리기전(Paint 전)까지 과정을 측정으로 삼습니다.

# INP란?

결국, INP의 목표는 사용자가 수행하는 모든 상호 작용에 대해 `상호 작용이 시작한 때부터 다음 프레임이 그려질 때까지의 시간`을 가능한 한 짧게 만드는 것.

<Video src='/posts/2023/08/interaction-to-next-paint/inp-vido.mp4' />

# INP 점수 측정하기
