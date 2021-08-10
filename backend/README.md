# Coding Note

## sanitize_html_1.default is not a function 등등

- 모듈시스템이 달라서 뜨는 에러 메세지.
- `tsconfig.json`의 `esModuleInterop: true`로 설정해 주거나 아래와 같이 모듈을 불러온다.

```ts
import * as sanitizeHtml from 'sanitize-html';
```
