---
title: "JWT: The modern way of authenticating"
path: "/jwt-the-modern-way-of-authenticating/"
date: "2015-01-08T18:51:28.000Z"
date_updated:   2015-01-08T19:20:16.000Z
tags: jwt, rest, apis, authentication, spa
---

Recently, [Thanos](http://attheo.do) got me into [JWT](http://jwt.io). Json Web Token is the modern way of authenticating between your REST API and a web/mobile/native client without using Sessions and/or cookies. This is a nice explanation of how things were [done](http://stackoverflow.com/questions/15051712/how-to-do-authentication-with-a-rest-api-right-browser-native-clients), until Json Web Tokens came into place.

What we can achieve with JWT is really simple: we are getting rid of cookies and sessions while the user's info is completely hidden within the request's header to the server.

Upon login, the server returns an encrypted token which, among other info, contains the user identifier. This identifier, which happens to be application specific, is then decrypted by the server at any moment required, which is what enables the server to know who's on the other end of the line.

Let's crack it down.

First we need a JWT Header like this
```json
{
	"typ":"JWT",
    "alg":"HS256"
}
```
which says that the JWT is going to be digitaly signed using the HS256 algorithm.
Base64url this and you have the first piece of your JWT, namely the Header.
`eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9`

Now we need our actual message that we are going to transmit, namely the Payload.
```json
{
	"iss":"joe",
    "exp":1300819380,
    "http://example.com/is_root":true
}
```
Yeap. Plain JSON where you can put anything you want. `iss` and `exp` are defined by the [specs](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-06#section-4.1) so you can easily use open source libraries. `exp` for example stands for Expiration Time in UNIX Timestamp and common libraries know that.

Base64url this and we have our second part.
`eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ`

Now since we choose the HS256 algorithm of our signature, we are going to concatenate our Header and Payload and sign them with the HS256 algorithm using a secret key. This is what gives us the Signature.

Concatenate all of them together, using dots and we have our JSON Web Token(without the break lines).

`eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9
.
eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ
.
dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
`

So, now you can store this piece of string on the client using [modern Client Storage mechanisms](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage), and send it to your server on every request. And your server will understand who you are. No more sessions, no more cookies.

Last but not least, make sure that you are using a secure connection with your server, since if that token is stolen, through Man In The Middle Attack, anyone can use it.

The [specs](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token-06) are really simple and you can get into it right away.

Further reading:

* [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)

* [Json Web Tokens: Examples](http://angular-tips.com/blog/2014/05/json-web-tokens-examples/)

* [OS Libraries](http://jwt.io/#libraries)
