---
title: React | Flux 패턴이란? 🤔
date: '2022-04-03'
tags: ['react', 'flux']
summary: Flux 패턴 알아보기
publish: true
---

# 🥲 MVC 패턴의 한계

![mvc1](/posts/mvc1.png)

**`MVC 패턴`** 은 **Model**에 데이터를 두고, **Controller**를 이용해 **Model** 데이터 수정 및 접근, **View**를 통해 데이터를 사용자에게 출력합니다.

> **Model - View 의존성 (양방향 데이터 바인딩)** 높음

![mvc](/posts/mvc2.png)
이러한 관계는 애플리케이션 규모가 늘어감에 따라 **Model**, **View** 수를 증가시키게 되고,
이는 결국 **데이터 흐름의 복잡도**가 늘어가게 되는 문제점이 됩니다.
복잡한 흐름은 사용자, 개발자가 예상하지 못하는 **버그를 야기**하게 됩니다.

## Facebook Notification 버그 🪲

<img src="/posts/facebook_bell.png" width="40%"/>

**`Facebook 우측 상단 (Header)`, 새로운 메세지 알림이 있지만 확인을 해도 새로운 메시지가 없는 버그**입니다.
확인을 위해 **`메세지 리스트`** 에 들어가면 알림은 사라지지만,
시간이 지나면 알림이 다시 나타나고 여전히 아무런 메시지도 존재하지 않습니다.

이러한 **버그**는 결국 **MVC의 한계**를 보여줍니다.
복잡하게 얽힌 **Model - View 데이터 흐름**에서 동일한 데이터를 보여줘야하는 **View**가 서로 다른 모델을 가르키고 있어 사용자가 원하는대로 업데이트 되지 않기 때문입니다.

> 위 **버그**를 해결하려면
> **`메세지 리스트 Model`** 과 **`facebook 우측 상단 (Header) Model`** 에도 **관계성**이 존재해야 겠죠..?
> ➡️ **데이터 흐름이 더욱 복잡해집니다. 😅**

# 😎 Flux 패턴 의 등장

> **Facebook 팀** 이 이러한 버그를 가만히 둘리가 없습니다.

![flux](/posts/flux.png)

**`Flux 패턴`** 은 `MVC 패턴` 의 양방향 데이터 바인딩 패턴을 대체 할 **단방향 데이터 바인딩 패턴**입니다.

## 작동방식

> - Action이 Dispatcher에게 특정 사용자 Action 전달
> - Dispatcher는 특정 Action Type 파악 후 Store에 전달
> - Store는 Dispatcher에게 요청에 내부 상태를 수정
> - View는 Store의 변화가 감지되면 View를 업데이트

### Action

사용자의 View에서의 행동을 감지합니다.
Action 정보를 갖고잇는 **객체**를 만들어 Dispatcher에 전달합니다.

### Dispatcher

**Flux의 모든 데이터 흐름을 관리하는 역할**
**Action**이 넘어오면 **Action**을 구분하여 **Store**에 보냅니다.

### Store

어플리케이션의 **모든 상태**가 존재합니다.  
**Store**가 변경되면 **View** 에 변경되었다는 사실을 알려줍니다.

> **Store**는 필요에 따라 여러 개가 존재할 수 있습니다.

### View

기존 View 성격을 가지고 있는 동시에,
**컨트롤러-뷰 (Controller-View)** 로서 **최상위 View**에서 Store의 데이터를 가져와
이를 자식 View 로 내려보내주는 역할을 하기도 합니다.
