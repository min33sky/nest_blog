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

### Warning: Received `false` for a non-boolean attribute. How do I pass a boolean for a custom boolean attribute?

- Styled-Component를 사용시 비정규 html 속성을 사용 시 뜨는 경고이다.
- 아래 코드로 해결이 가능하긴 한데 더 찾아봐야 할듯

```ts
// react-router-dom의 Link 컴포넌트를 사용 시 경고 해결
const StyledLink = styled(
  ({
    cyan,
    fullWidth,
    to,
    ...rest
  }: {
    cyan?: boolean;
    fullWidth?: boolean;
    to: string;
    rest?: LinkProps;
  }) => <Link to={to} {...rest} />
)`
  // Style Code....
`;
```

### react-query에서 Link 컴포넌트를 사용할 때 리패치가 안되는 경우

- 다른 주소로의 라우팅은 리패치가 잘 되지만 같은 컴포넌트로의 라우팅(예: 쿼리스트링만 바뀌는 경우)은 `리패치`가 되지 않는다. 그 이유는 react query의 key값이 동일하기 때문에 이미 캐시된 값을 사용하기 때문이다.
- 해결은 `react-query`의 `key`값을 동적으로 바꾸면 된다. `key`값으로 배열을 사용할 수 있기 때문에 아래와 같이 수정하면 `리패치`가 잘 된다.

```ts
import queryString from 'query-string';

// react-router-dom의 hooks
const location = useLocation();
const params = useParams();

let parsed = queryString.parse(location.search);
parsed = {
  ...parsed, // query
  ...params, // route parameter
};
const url = queryString.stringify(parsed);

const { status, data } = useQuery(['query', url], () => getPostList(url));
```
