import { ValidateObjectIdMiddleware } from './validate-object-id.middleware';

describe('ValidateObjectIdMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateObjectIdMiddleware()).toBeDefined();
  });
});
