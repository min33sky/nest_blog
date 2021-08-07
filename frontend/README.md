# CODING NODE

## Note

### 새로고침해도 인증상태 유지하기

- 백앤드로부터 전달받은 Token을 이용해서 현재 유저의 상태를 Fetch해야 한다.
  그러기 위해서 Token을 저장을 해야하는데 이번 프로젝트에서는 `sessionStorage`에 저장하는 방식을 택했다. 추가로 `rudux`도 활용했는데 `sessionStorage`에서 token를 가져와서 `store`에 token과 로그인 여부를 저장하였다. 이 작업은 안해도 현재는 상관 없는거 같다.

- token을 `sessionStorage`에서 가져오는 작업은 `index.tsx`에서 하는것이 낫다. useEffect()와 같은 Hook에서 사용하면 깜빡거림이 발생하여 거슬린다.

- 다음은 위를 구현한 코드이다.

```ts
// index.tsx

function loadToken() {
  try {
    // 스토리지에 토큰이 있는지 확인
    const token = sessionStorage.getItem('access_token');
    if (!token) return;

    // Store에 토큰을 저장
    store.dispatch(setToken(token));
  } catch (error) {
    console.log('sessionStorage is not working');
  }
}

loadToken();

render() {...}

```
