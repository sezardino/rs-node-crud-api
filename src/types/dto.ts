export type CreateUserDto = {
  username: string
  age: number
  hobbies: string[]
}

export type UpdateUserDto = {
  userId: string
  username: string
  age: number
  hobbies: string[]
}
