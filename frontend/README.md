# TS-React-Boilerplate

> Frontend Development Setting

## Modules

- React
- Typescript
- Webpack (v5)
- eslint
- prettier

## Problems

- Unable to resolve path to module. eslint(import/no-unresolved)

  - "eslint-import-resolver-typescript" 설치
  - .eslintrc에 다음 코드 추가

```json
"import/resolver": {
      "typescript": {},
    }
```

- 빌드할 때 아래와 같은 에러메세지가 뜨면 `ts-node`를 설치하자

```
[webpack-cli] Unable load 'C:\git\ts-react-boilerplate\webpack.config.ts'
[webpack-cli] Unable to use specified module loaders for ".ts".
```
