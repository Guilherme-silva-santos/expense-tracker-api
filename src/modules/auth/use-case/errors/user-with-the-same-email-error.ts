export class UserWithTheSameEmailError extends Error {
  constructor() {
    super('User with the same email already exists')
  }
}
