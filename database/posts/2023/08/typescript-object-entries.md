---
title: TypeScript, Object.entries()의 타입을 추론해보자
date: 2023-08-30
summary: Object.entries() 메소드 타입 추론
publish: false
---

# Object.entries()

```typescript showLineNumbers
const obj = {
  a: 10,
  b: 20,
  c: 30,
};

Object.entries(obj).map(([key, value]) => {
  console.log([key, value]);
});
// [LOG]: ["a", 10]
// [LOG]: ["b", 20]
// [LOG]: ["c", 30]
```

`Object.entries()`는 **enumerable** 속성이 있는 배열을 반환한다. 이를 통해 우리는 객체 내부를 반복문을 통해 **순회 및 탐색**이 가능해진다.

# 문제점

```typescript showLineNumbers
type A = {
  id: number;
  name: string;
};

type B = {
  id: number;
  phoneNumber: string;
};

type C = {
  id: number;
  date: {
    year: number;
    month: number;
    day: number;
  };
};

const entries = (obj: Obj) => {
  (Object.entries(obj) as Entries<Obj>).map(([key, value]) => {
    return [key, value];
  });
};
//
```

> `TypeScript`를 이용한다고 가정해보자
