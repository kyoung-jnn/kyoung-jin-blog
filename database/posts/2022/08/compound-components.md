---
title: React, Compound Components (컴파운드 컴포넌트 패턴)
date: '2022-08-26'
summary: React의 컴포넌트 디자인 패턴
publish: true
---

# Compound Components Pattern

`Compound Components 패턴`은 **React**의 컴포넌트 디자인 패턴중 한가지 입니다.

해당 패턴은 내부 로직들을 외부로 부터 감춰 **추상화**하고 로직에 필요한 **state**는 내부에서 공유하는 형식입니다.
**state**를 내부에서 공유함으로 흔히 얘기하는 `prop drilling`없이 컴포넌트를 구성할 수 있습니다.

또한, 하나의 컴포넌트가 모든 `관심사`를 관리하지 않고 각각의 역할로 분리된 내부 컴포넌트가 **개별적으로 관심사를 관리**하기 때문에
지겹도록 들었던 `관심사 분리 (Separation of Concerns)`가 가능해집니다. 😏

## 예시

> 간단한 **카운팅 컴포넌트**를 만들어봅시다.

### 1. 상태 공유

```ts
const CounterContext = createContext({});

function Counter({ children }) {
  const [count, setCount] = useState(0);

  const initialValue = {
    count,
    setCount,
  };

  return (
    <CounterContext.Provider value={initialValue}>
      {children}
    </CounterContext.Provider>
  );
}

export const useCounterContext = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(`Provider가 존재하지 않습니다.`);
  }
  return context;
};

export default Counter;
```

**State**를 공유하기 위해 **React Context API**를 사용했습니다.

### 2. 관심사 분리

```ts
function Increase() {
  const { setCount } = useCounterContext();
  return <div onClick={() => setCount((prev) => ++prev)}>증가</div>;
}

function Decrease() {
  const { setCount } = useCounterContext();
  return <div onClick={() => setCount((prev) => --prev)}>감소</div>;
}

function Label() {
  const { count } = useCounterContext();
  return <div>{count}</div>;
}

Counter.Increase = Increase;
Counter.Decrease = Decrease;
Counter.Button = Label;
```

`useCounterContext`을 통해 컴포넌트들이 상태에 접근하여 각자의 관심사에 맞는 액션을 수행합니다.

### 3. 완성! 👏

```javascript
function App() {
  return (
    <Counter>
      <Counter.Increase />
      <Counter.Decrease />
      <Counter.Button />
    </Counter>
  );
}
```

완성된 모습을 보면 `Counter 컴포넌트`의 로직이 외부에 노출되지 않고 각자의 관심사에 맞게 컴포넌트가 분리된 모습을 볼 수 있습니다.

**Context API**를 사용하지 않고 **Custom hook**을 통해서 상태를 관리하는 방법과 상세한 상태 관리를 위해 **Reducer**를 취상위에 두는 방법도 있을 수 있겠네요 😎

> 프로젝트 구조에 `Atomic Design 패턴`을 적용하는 경우,
>
> **organism**, **module** 컴포넌트에서, 해당 컴포넌트에서만 사용하는 **atom** 컴포넌트는 `Compound Components 패턴`을 이용해서 따로 **atom**으로 빼지 않고 구성하면
>
> 조금더 가독성 있고 깔끔한 구조를 갖게 되지 않을까 생각이 듭니다.

---

> 참고 [아티클1](https://kentcdodds.com/blog/compound-components-with-react-hooks) [아티클2](https://javascript.plainenglish.io/5-advanced-react-patterns-a6b7624267a6)
