import { v4 as uuidv4 } from 'uuid'
import { CreateUserDto, UpdateUserDto } from '../types/dto'
import { User } from '../types/entity'

export class UserService {
  private users: User[]

  constructor(initialUsers: User[] = []) {
    this.users = initialUsers
  }

  getAllUsers(): User[] {
    return [...this.users]
  }

  getUserById(userId: string): User | null {
    const user = this.users.find((user) => user.id === userId)
    return user ? { ...user } : null
  }

  createUser(dto: CreateUserDto): User {
    const { age, hobbies, username } = dto

    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies: [...hobbies],
    }

    this.users = [...this.users, newUser]
    return { ...newUser }
  }

  updateUser(dto: UpdateUserDto): User | null {
    const { age, hobbies, userId, username } = dto

    const userIndex = this.users.findIndex((user) => user.id === userId)
    const user = this.users[userIndex]

    if (!user) return null

    const updatedUser: User = {
      ...user,
      username,
      age,
      hobbies: [...hobbies],
    }

    this.users = [
      ...this.users.slice(0, userIndex),
      updatedUser,
      ...this.users.slice(userIndex + 1),
    ]

    return { ...updatedUser }
  }

  deleteUser(userId: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === userId)

    if (userIndex === -1) {
      return false
    }

    this.users = this.users.filter((u) => u.id !== userId)

    return true
  }
}
