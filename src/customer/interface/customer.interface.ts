export interface CustomerInterface extends Document{
  readonly firstName: string,
  readonly lastName: string,
  readonly email: string,
  readonly phone: string,
  readonly address: string,
  readonly description: string,
  readonly createdAt: Date
}