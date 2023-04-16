---
title: HTTP Basic, Bearer 인증 방식
date: '2023-04-16'
summary: HTTP Basic, Bearer 인증 방식을 알아보자.
publish: true
---

# HTTP 요청 인증

<Image auto={true} src="/posts/2023/04/basic-bearer-authentication/httpauth.png" />

[RFC 7235](https://datatracker.ietf.org/doc/html/rfc7235)에 **HTTP 인증 프레임워크**가 정의 됨에 따라, 클라이언트-서버간 요청과 응답이 주고 받아질 때 인증이 필요한 상황에서는 아래와 같은 **인증 헤더**를 이용한다.

올바른 인증 정보를 넣으면 200 (OK) 응답 코드를 갖고 응답된다. 데이터가 인증 헤더를 누락되면 401 (Unauthorized) 응답 코드를 갖고, 권한이 없는 접근이라면 403 (Forbidden) 이 응답으로 온다.

```network
Authorization: <type> <credentials>
```

`<type>` (인증 방식) 으로 어떤 **인증 스킴(Scheme)** 이 들어가냐에 따라서 `<credentials>` (인증 정보) 이 달라진다.

# Basic 인증이란?

```network
Authorization: Basic Base64-Encoded({ID}:{Password})
```

HTTP 인증 과정에서 가장 기본적인 인증 방식, **base64**를 이용하여 **사용자의 ID, 비밀번호를 encode**하여 인증 정보로 이용한다.
**하지만**, _base64로 encode된 인증 정보를 decode한다면?_ 바로 사용자 정보가 노출된다. 🤯

따라서 귀중한 정보를 인증 정보로 이용하는 만큼 정보 보호를 위해 반드시 **HTTPS/SSL**과 같이 이용해야 한다.

# Bearer 인증이란?

> 참고로 **bearer**의 뜻은 **운반자, 전달자** 라는 뜻. 📦

[RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750)에 정의된 OAuth 2.0 프레임워크를 통한 인증 방식, 사용자가 클라이언트에서 인증이 되면 생성되는 **Bearer 토큰**을 이용하여 서버와의 인증 정보로 사용한다. 주로 **Oauth 2.0**의 표준으로 Bearer 토큰을 사용하지만 설계에 따라서 **자체적이게 생성한 Bearer 토큰을 사용할 수도 있다.**

> Bearer 토큰은 **JWT**일 수도 있고 **16진수 문자열**일 수도 있다. **Bearer 토큰**이라고해서 무조건 **JWT**가 아니다!

## JWT

Bearer 인증에 **JWT**를 사용함으로 JWT의 장점을 그대로 가져올 수 있다.

- 상태를 저장하지 않아(**Stateless**) DB를 로드하는 행동을 하지 않아도 된다.
  - 자체적으로 정보를 갖고 있어서 토큰을 검증하는 과정에서 시간이 적게 든다. (Basic 인증 방식은 DB에 인증 정보를 쌓는 방식)
- 서버에서 토큰의 리소스 접근 권한 & 토큰 유효기간 등을 설정할 수 있어서 **리소스 보호에 효과적**이다.

---

> 참고 | [MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Authentication), [RFC](https://datatracker.ietf.org/doc/html/rfc7235)
