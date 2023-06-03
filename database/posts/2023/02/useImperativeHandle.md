---
title: useImperativeHandle 훅 찍어 먹기
date: '2023-02-05'
thumbnail: '/thumbnail/react.png'
summary: React, useImperativeHandle 훅
publish: true
---

# useImperativeHandle

React에는 다양한 `Hook`이 존재한다. 일반적으로 **useState**, **useEffect**, 조금 더 가서 **useReducer, useMemo** 같은 `Hook`들은 우리가 자주 접해봐도 `useImperativeHandle` Hook은 생소한 경우가 많다.

해당 Hook은 일반적으로 혼자서 쓰이는 것이 아니라 **useRef**와 같이 이용된다.

> 본질적으로 `useRef`는 `.current` 프로퍼티에 변경 가능한 값을 담고 있는 `상자`와 같다.

공식 문서에는 **useRef**를 간단히 위와 같이 정의하고 있다. 우리는 **상자**안에 **접근가능한 DOM**을 담을 수 있다.
만약 부모 컴포넌트에서 자식 컴포넌트의 DOM에 접근하기 위해서는 `forwardRef` 를 사용하면 된다.

```js
function Children(props, ref) {
  return <input ref={ref} />;
}

export default forwardRef(Children);
```

이를 통해 부모 컴포넌트는 자식 컴포넌트의 `input`의 **DOM node**에 접근이 가능해진다!

> 한마디로 **forwarding**된 `ref`를 이용하여 자식 컴포넌트 **제어**를 할 수 있다는 것!

여기서, 부모 컴포넌트는 props로 전달해준 **ref**로 자식 컴포넌트의 **DOM node**에 접근했을 때, **우리는 필요 이상으로 많은 부분에 접근이 가능해진다.** 필요 이상으로 많은 접근 권한을 가진 **ref** 핸들러를 작성할 여지가 있다는 것이다.

이러한 상황에서 `useImperativeHandle`을 이용할 수 있다.

## 정의

```js
useImperativeHandle(ref, createHandle, [deps]);
```

`createHandle`에 원하는 **핸들러**를 지정하면 해당 핸들러 함수를 외부(부모)에서 호출이 가능해진다. **부모 컴포넌트**가 선언한 `ref`에 **커스텀한 핸들러**를 지정하면 부모에서는 해당 커스텀 핸들러 사용이 가능해진다. 즉, 자식에서 부모가 사용할 핸들러 함수가 지정이 가능하게 된다. 👍

### 선언적 프로그래밍

이렇게 될 경우 핸들러 함수를 가진 부모는 [선언적 프로그래밍](https://ko.wikipedia.org/wiki/%EC%84%A0%EC%96%B8%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)이 가능해진다는 점이 눈에 띄었다.
자식을 제어하는 핸들러를 부모에서 직접 작성하는 것(명령형)이 아닌 자식 컴포넌트에게 위임함으로 부모는 어떻게 보단 **무엇을 할 것인가**에 대해 집중할 수 있는 것이다.

> [React 공식 문서](https://beta.reactjs.org/reference/react/useImperativeHandle)에서도 **useImperativeHandle**을 설명을 `Exposing your own imperative methods` 라고 지칭하고 있다. 😁

## 코드 예시

### 부모 컴포넌트

```js
function App() {
  const inputWithListRef = useRef();

  const handleClick = () => {
    inputWithListRef.current.focusAndScroll();
  };

  return (
    <>
      <button onClick={handleClick}>버튼</button>
      <InputWithList ref={inputWithListRef} />
    </>
  );
}

export default App;
```

### 자식 컴포넌트

```js
function InputWithList(props, ref) {
  const inputRef = useRef();
  const divRef = useRef();

  useImperativeHandle(ref, () => ({
    focusAndScroll: () => {
      // list 접근
      const node = divRef.current;
      node.scrollTop = node.scrollHeight;

      // input 접근
      inputRef.current.focus();
    },
  }));

  const list = [];
  for (let i = 0; i < 50; i++) {
    list.push(<li key={i}>Comment #{i}</li>);
  }

  return (
    <>
      <ul ref={divRef} style={{ height: 200, overflow: 'scroll' }}>
        {list}
      </ul>
      <input ref={inputRef} />
    </>
  );
}

export default forwardRef(InputWithList);
```

부모 컴포넌트가 핸들러 함수를 실행하면 자식 컴포넌트안에 있는 `input`을 focus하고 `list`를 맨 끝으로 내리는 로직이다.
코드에서 볼 수 있듯이 부모 컴포넌트는 내부적으로 **2개의 ref 존재 유무**를 모르고 해당 핸들러를 단순히 실행시킬뿐이다!

해당 훅을 많이 사용할 때가 있을까? 라는 생각이 들지만 **ref**를 통해서 복잡한 로직을 작성할 때 알고 있으면 꽤 유용하게 쓸 수 있을것 같다는 생각이 든다.
