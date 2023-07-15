---
title: HTTP Strict-Transport-Security(HSTS)란?
date: 2023-06-03
summary: HTTPS를 강제하는 HSTS 설정
publish: true
---

# 🔐 HTTP Strict-Transport-Security (HSTS)

보통의 웹사이트 HTTPS Redirect 접근은 아래와 같이 이루어진다.

1. 사용자가 **HTTP** 요청으로 웹사이트를 접속
2. 웹 서버가 HTTPS로 **Redirect**를 **301** or **302** 으로 응답
3. 사용자가 **HTTPS** 요청으로 웹사이트 다시 접속

위 상황이 크게 문제가 되어 보이지 않지만, 사용자가 결국 HTTP 요청을 **1번 단계**에서 보낸다는 문제가 발생한다. **Man In The Middle (MITM)** 이라는 중간자 공격에 노출될 상황이 발생한다는 것.

## 🥷 Man In The Middle (MITM)

> 공격자가 **클라이언트 웹 서버 사이에 존재하며 클라이언트의 웹사이트 HTTP 연결을 이용**한다. 공격자는 클라이언트가 보내는 정보들을 평문으로 모두 열람이 가능하며 악의적인 사이트로 Redirect도 가능하게 된다.

# 왜 사용할까?

그렇다면 **'웹사이트를 접근할때 HTTP 요청 자체를 진행하지 않으면 어떨까?'** 이를 위해 [HSTS (RFC 6797)](https://www.rfc-editor.org/rfc/rfc6797) 개념이 등장했다. `HSTS`는 해당 설정이 존재하는 웹사이트 접속시 **HTTPS 접근을 하도록 강제**한다.

최초 웹사이트 접근시 HTTPS 응답 헤더에 HSTS 설정 값이 존재하면, 다음번 접속시 사용자가 HTTP로 웹사이트를 접근할 때 **웹 서버를 거칠 필요도 없이 `브라우저`에서 HTTPS로 웹사이트를 접근하게 하는 것이다.**

<Image auto={true} src="/posts/2023/05/hsts/hsts.png" />

따라서 기능을 위해서는 브라우저의 HSTS 지원이 필수적이다. 다행히도 대부분의 브라우저가 지원을 해주고 있다. 🥰

# 적용법

## 1. 웹 서버 HTTPS 응답 헤더 수정

프로젝트의 웹 서버에서 **HTTP 응답 헤더 필드**에 `Strict-Transport-Security` 필드를 추가해준다. 필드를 추가할 때, **3가지의 옵션**이 존재한다.

- **max-age**
  - 초(second)단위로 지정하며 HSTS가 웹사이트에 얼마나 적용될지 지정해준다. 권장 값은 2년 (63072000)
- **includeSubDomains** (optional)
  - mobile.test.com, sub.test.com 같은 서브 도메인에도 적용된다
- **preload** (optional)
  - **Preload List**에 웹사이트를 추가한다. 구글이 만든 [**리스트**](https://hstspreload.org/)에 웹사이트가 등록이 된다. 기본적으로 사용자가 HSTS 설정이 된 웹사이트에 한번은 들어와야 사용자의 브라우저에 HSTS이 지정되는데, 해당 옵션을 통해 **Preload List**에 지정되면 **웹사이트 최초의 접근에도 HSTS 설정이 발동**된다고 한다.

```nginx title="nginx 예시"
# 필자는 nginx를 통해서 응답 헤더를 지정해줬다.

add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";
```

## 2. 작동 여부 확인

```curl {4}
HTTP/1.1 307 Internal Redirect
Location: https://test.com/
Non-Authoritative-Reason: HSTS
```

테스트할 웹사이트에 HTTPS 접속을 하여 브라우저에 웹사이트에 등록을 해준다.

그 후 HTTP로 해당 웹사이트를 접속해보자. HTTPS로 **307 Redirect**가 되면서 `Non-Authoritative-Reason` 라는 필드에 **HSTS 값**이 생겼다. 해당 필드가 생성됨을 확인하면 이제부터 사용자의 브라우저는 해당 웹사이트에서 HSTS 동작을 한다

### 만약 내 브라우저에서 HSTS가 지정된 사이트를 없애고 싶다면?

**크롬 기준**으로 `chrome://net-internals/#hsts`에 접속해서 도메인을 입력해주자.

> 참고: [MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Strict-Transport-Security)
