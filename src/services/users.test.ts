import { UserService } from './users'

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService()
  })

  test('should create a new user', () => {
    const newUser = userService.createUser({
      username: 'Alice',
      age: 28,
      hobbies: ['gaming', 'reading'],
    })

    expect(newUser).toHaveProperty('id')
    expect(newUser.username).toBe('Alice')
    expect(newUser.age).toBe(28)
    expect(newUser.hobbies).toEqual(['gaming', 'reading'])
  })

  test('should get all users', () => {
    userService.createUser({
      username: 'Alice',
      age: 28,
      hobbies: ['gaming', 'reading'],
    })

    const users = userService.getAllUsers()
    expect(users.length).toBe(1)
  })

  test('should get user by ID', () => {
    const newUser = userService.createUser({
      username: 'Alice',
      age: 28,
      hobbies: ['gaming', 'reading'],
    })

    const user = userService.getUserById(newUser.id)
    expect(user).toEqual(newUser)
  })

  test('should return null for non-existent user ID', () => {
    const user = userService.getUserById('non-existent-id')
    expect(user).toBeNull()
  })

  test('should update an existing user', () => {
    const newUser = userService.createUser({
      username: 'Alice',
      age: 28,
      hobbies: ['gaming', 'reading'],
    })

    const updatedUser = userService.updateUser({
      userId: newUser.id,
      username: 'Alice Updated',
      age: 29,
      hobbies: ['gaming', 'music'],
    })

    expect(updatedUser).toEqual({
      ...newUser,
      username: 'Alice Updated',
      age: 29,
      hobbies: ['gaming', 'music'],
    })
  })

  test('should return null when updating non-existent user', () => {
    const updatedUser = userService.updateUser({
      userId: 'non-existent-id',
      username: 'Bob',
      age: 30,
      hobbies: [],
    })

    expect(updatedUser).toBeNull()
  })

  test('should delete a user', () => {
    const newUser = userService.createUser({
      username: 'Alice',
      age: 28,
      hobbies: ['gaming', 'reading'],
    })

    const isDeleted = userService.deleteUser(newUser.id)
    expect(isDeleted).toBe(true)
    expect(userService.getUserById(newUser.id)).toBeNull()
  })

  test('should return false when deleting non-existent user', () => {
    const isDeleted = userService.deleteUser('non-existent-id')
    expect(isDeleted).toBe(false)
  })
})
