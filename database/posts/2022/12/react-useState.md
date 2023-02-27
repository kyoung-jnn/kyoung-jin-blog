---
title: React의 useState 내부 동작 방식과 클로저
date: '2022-12-26'
thumbnail: '/thumbnail/react.png',
summary: React, useState 내부 동작 과정 파헤치기
publish: true
---

# useState Hook

**React**를 사용하다보면 **상태 관리**를 위해 **React**에서 제공하는 `useState` Hook을 자연스럽게 사용한다.

'**내가 `useState` Hook을 정말로 작동 원리를 이해하고 사용하고 있는가?**' 에 대한 회의감이 문득 들어서, 내부 코드와 동작 방식에 대해서 조금 생각해 보았다. 🤓

# 내부 구현 코드

```js
// ReactHooks.js or node_modules/react/cjs/react.development.js

function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

우리가 사용했던 `useState`는 위와 같이 선언 되어있다. 초기 값을 인자로 받아 선언된 `dispatcher 객체`의 useState 함수에 넘겨준다.

> [ReactHooks.js](https://github.com/facebook/react/blob/main/packages/react/src/ReactHooks.js) or 프로젝트 내부 **node_modules 경로**로 가면 누구나 볼 수 있다.

```js
const [상태, 상태 변경 함수] = useState(초기 값)
```

**반환 값**은 우리가 알고있는 **[상태, 상태 변경 함수]** 형태의 **배열**!

```js
const ReactCurrentDispatcher = {
  current: (null: null | Dispatcher),
};

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;

  {
    if (dispatcher === null) {
      error(
        'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for',
      );
    }
  }
  return dispatcher;
}
```

```js
// shared/ReactSharedInternals.js
const ReactSharedInternals = {
  ReactCurrentDispatcher,
  ReactCurrentCache,
  ReactCurrentBatchConfig,
  ReactCurrentOwner,
};
```

자, 그러면 **dispatcher**를 반환하는 `resolveDispatcher()` 함수를 살펴보자. `resolveDispatcher()` 에서는 다시 `ReactCurrentDispatcher` 라는 객체의 **current 프로퍼티**를 반환하고 있다.
우리가 Hook을 **컴포넌트 밖에 사용했을 때** 발생하는 오류도 여기서 관리되고 있다.

다시 `ReactCurrentDispatcher`는 `ReactSharedInternals` 객체에서 관리되고 있는데, 해당 객체는 **ReactSharedInternals.js** 라는 외부 모듈 형식으로 되어있다.

이제 **ReactSharedInternals.js** 를 불러와서 `ReactCurrentDispatcher.current` 를 할당하고 있는 곳만 찾으면 된다..🤣

```js
// packages/react-reconiler/ReactFiberHooks.js
const {ReactCurrentDispatcher, ReactCurrentBatchConfig} = ReactSharedInternals;

function renderWithHooks(
  ...
) {
  ...

  ReactCurrentDispatcher.current =
    current === null || current.memoizedState === null
      ? HooksDispatcherOnMount
      : HooksDispatcherOnUpdate;

  ...
}
```

[react-reconiler 패키지](https://github.com/facebook/react/tree/main/packages/react-reconciler)속 [ReactFiberHooks.js](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.js)에서 `renderWithHooks` 함수가`ReactCurrentDispatcher.current`를 할당되고 있다.

> **react-reconciler 패키지**에 모든 함수들을 보진 못 했지만, 패키지 이름처럼 컴포넌트의 변경 사항을 DOM에 반영하기 위한 React의 [Reconciliation](https://ko.reactjs.org/docs/reconciliation.html)와 Fiber 연관이 있는 패키지 같다.

`HooksDispatcherOnMount` & `HooksDispatcherOnUpdate` 객체에 우리가 원하는 **useState 함수의 원본**이 존재한다. (다른 Hook들도 존재)

```js
const HooksDispatcherOnMount: Dispatcher = {
  readContext,
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useInsertionEffect: mountInsertionEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState, // 여기있다~
  ...
};

function mountState(initialState) {
  var hook = mountWorkInProgressHook();

  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  hook.memoizedState = hook.baseState = initialState;
  var queue = {
    pending: null,
    interleaved: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  };
  hook.queue = queue;
  var dispatch = (queue.dispatch = dispatchSetState.bind(
    null,
    currentlyRenderingFiber$1,
    queue,
  ));
  return [hook.memoizedState, dispatch];
}
```

드디어 찾았다. `mountState` 함수가 우리가 찾던 **useState의 원본**이다!

## [hook.memoizedState, dispatch]

**해당 배열을 우리는 useState를 호출하면서 사용하고 있었다.** `hook.memoizedState` 은 [mountWorkInProgressHook()](https://github.com/facebook/react/blob/9e3b772b8cabbd8cadc7522ebe3dde3279e79d9e/packages/react-reconciler/src/ReactFiberHooks.new.js#L636-L655) 가 return 하는 값이다. 해당 함수는 **hook 객체**를 만들어 리턴한다.

## Hook 객체

```js
const hook: Hook = {
  memoizedState: null,
  baseState: null,
  baseQueue: null,
  queue: null,
  next: null,
};
```

`hook 객체`는 상태 값 뿐만 아니라 **queue**와 **next**라는 프로퍼티를 갖고 있다. 만약 진행되고 있는 Hook이 있다면 다음에 실행될 수 있도록 **next**에 `연결 리스트` 형태로 연결시켜준다. **queue** 는 단일 Hook이 여러번 호출될 경우 저장되는 용도라고 한다!

# 클로저, Closure

클로저는 아래와 같은 **한 문장으로 간략히 정의**된다.

> 함수가 자신의 렉시컬 스코프를 기억해 렉시컬 스코프 밖에서 호출되어도 해당 스코프에 접근이 가능하다.

**Hook**을 사용하는 **함수형 컴포넌트**도 결국 하나의 함수이다.

결국 우리는 `useState`를 사용하면 위에서 찾아봤던 `hook 객체의 memoizedState`을 활용하게 되는데,
해당 값의 접근을 위해 **JavaScript**의 `클로저`가 사용된다. <br/>

> `useState`을 사용해서 상태 값에 접근할 때, `mounsState 함수의 클로저`를 통해 컴포넌트의 스코프를 벗어나 `hook 객체의 memoizedState`에 접근이 가능해지고 해당 값은 결국 컴포넌트에서 상태 값으로 이용하고 있었던 것이다.

<Image size="medium" src="/posts/2022/12/react-useState/obj.png" />

> 런타임 환경에서 `ReactCurrentDispatcher` 객체 구성 <br/>
> 비단 `useState` 뿐만 아니라 다양한 **Hook**들이 `ReactCurrentDispatcher` 객체를 통해 접근한다는 것을 확인할 수 있다.
> 해당 값들도 클로저를 이용하여 접근하여 자연스럽게 사용하고 있었던 것!
