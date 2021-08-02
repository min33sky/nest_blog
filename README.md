# 블로그

> Nest & React Blog

---

## Backend Stack

- Nestjs
- mongoDB
- jwt
- passport

## Frontend Stack

- React

---

## Error & Solution

### Nest에서 Hot Reload가 안되는 문제

- @nestjs/cli `8.1.0`버전에서 hmr이 작동이 안되는 문제가 있다.

### Make sure your property is decorated with a "@Prop({ type: TYPE_HERE })" decorator

- Schema에 객체 타입을 넣을 때 @Prop()에 타입 지정을 안할 시 에러가 발생. 아래와 같이 작성하여 해결

```ts
export class Writer {
  _id: mongoose.Types.ObjectId;
  email: string;
  nickname: string;
}

@ApiProperty({
    description: '작성자 정보',
  })
  @Prop(Writer)
  user: Writer;

```
