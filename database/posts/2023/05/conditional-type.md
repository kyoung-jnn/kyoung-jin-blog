---
title: TypeScript 조건부 타입 이해하기, Conditional Type
date: 2023-05-05
summary: TypeScript의 조건부 타입에 대해서
publish: true
---

# 조건부 타입, Conditional Type

```typescript
type Type = T extends U ? X : Y;
```

`타입스크립트`의 조건부 연산은 **삼항 연산자 조건문**같은 형태을 띄고있다. `extends`를 기준으로 **왼쪽 타입(T)** 이 **오른쪽 타입(U)** 에 할당이 가능하다면 **X**, 아니면 **Y**이다.

> 한마디로 우리가 알던 삼항 연산자에서 **타입으로 조건문의 결과**를 얻게 해준다.

## 예시

```typescript showLineNumbers {6}
interface Animal {}
interface Person {}

type AnimalAndPersonKey = 'dog' | 'me' | 'cat';
type AnimalAndPerson<T extends AnimalAndPersonKey> = {
  [K in T]: K extends 'me' ? Person : Animal;
};

const Object: AnimalAndPerson<AnimalAndPersonKey> = {
  dog: {},
  me: {},
  cat: {},
};
```

위 예시에서는 제네릭 안 `extends`을 통해서는 **타입 제한**을 걸었다.

그 후 반복되는 타입들을 지정하면서 `조건부 타입`을 통해 사용자가 제네릭으로 넘겨준 Key의 타입에 따라서 Value에 **"me" 일 경우 Person 타입, 그 외는 Animal** 타입으로 지정 할 수 있다.

# 분산 조건부 타입, Distributive Conditional Types

조건부 타입에는 한가지 특징이 존재한다.

> `조건부 타입`에서 제네릭이 **유니온 타입**을 만나면 `분산적`으로 동작한다는 것이다.

말로 설명하면 이해가 잘 안되서 예시를 바로 보는것이 낫다. 😎

## 예시

```typescript showLineNumbers {3}
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
```

> 위와 같은 예시에서 `Result`의 값은 어떻게 될까?

```typescript
❌ type Result = (string | number)[];

✅ type Result = string[] | number[];
```

❌ 라고 생각할 수 있지만, `분산 조건부 타입`으로 인해 결과적으로 ✅ 같이 된다. **유니온 타입으로 지정된 타입을 하나씩 분산(순회)하면서 조건부 타입에 대입하기 때문이다.**

```typescript
type Result =
  | (string extends any ? string[] : never)
  | (number extends any ? number[] : never);
```

> 조건부 타입에서 `never`는 해당 타입을 제외시킨다는 의미로 사용된다.

## 응용

이러한 조건부 타입을 응용해서 TypeScript의 **유틸리티 타입**을 직접 만들어 볼 수 있다. 실제로 내부적으로 유틸리티 타입들은 조건부 타입을 사용하고 있다.

### Exclude

```typescript
type MyExclude<T, U> = T extends U ? never : T;
```

### Omit

```typescript
type MyOmit<T, K> = {
  [key in keyof T as key extends K ? never : key]: T[key];
};
```

# infer 추론 타입

```typescript
type Type = T extends infer U ? X : Y;
```

`infer` 키워드는 조건부 타입에서 **extends 절에서 사용가능한 키워드**이다.

`infer`를 통해 **T로 들어온 타입 혹은 T의 일부 타입을 U로 할당**해준다. 할당된 **U**는 조건부 로직의 결과나 과정에 사용이 가능하게 된다.

## 예시

```typescript showLineNumbers
type ReturnType<T> = T extends (...args: never[]) => infer R ? R : never;

type Num = ReturnType<() => number>; // number
type Str = ReturnType<(x: string) => string>; // string
```

예시에서 조건부 연산은 **T**가 **함수 형태**인지 확인한다.

```ts
() => number
() => infer R
```

그 후 `infer R`를 통해 **T**로 들어온 **함수의 결과 값(Return)** 을 알아서 추론하여 **R**에 담게 된다. 그 후 **T가 함수이면 함수의 결과 타입을 반환하는 타입**이 된다.

> `ReturnType`이란 타입은 함수의 결과값에 대한 타입 정보를 모른다. 하지만 `infer`를 통해 들어온 T 함수의 결과를 **추론**해서 타입을 생성하게 된다.

```typescript
type ReturnType<T> = T extends (...args: never[]) => any => string | number : never;
```

만약 `infer`를 사용하지 않는다면 **유니온 타입**을 직접적으로 명시하여 함수의 결과값 타입을 알 수 있을 것이다. 하지만 함수가 조금만 더 복잡해지거나 오버로딩 된다면? 지속적으로 `ReturnType`을 수정해줘야 할 것이다. 🥹

> 참고 [TS Docs](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
