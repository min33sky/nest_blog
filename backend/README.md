# Coding Note

## sanitize_html_1.default is not a function 등등

- 모듈시스템이 달라서 뜨는 에러 메세지.
- `tsconfig.json`의 `esModuleInterop: true`로 설정해 주거나 아래와 같이 모듈을 불러온다.

```ts
import * as sanitizeHtml from 'sanitize-html';
```

## 순환 참조 문제

- 일반 JS Module에서도 서로 모듈을 `import` 할 경우 순환 참조 문제가 발생하는데 Nest Module에서도 서로 참조할 경우 문제가 발생한다.

- 아래 코드와 같이 참조할 모듈의 imports 부분에 `forwardRef(() => ReferenceModule)`를 넣어주면 해결된다.

```ts
@Module({
  imports: [
    ...//? UserModule에서도 넣어줘야 한다. (forwardRef(() => AuthModule))
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```
