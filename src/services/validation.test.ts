import { ValidationService } from './validation'

describe('ValidationService', () => {
  test('should validate user ID correctly', () => {
    const validId = '123e4567-e89b-12d3-a456-426614174000'
    const invalidId = 'invalid-uuid'

    expect(ValidationService.validateId(validId)).toBe(true)
    expect(ValidationService.validateId(invalidId)).toBe(false)
  })

  test('should validate user data correctly', () => {
    const validUserDto = {
      username: 'Alice',
      age: 28,
      hobbies: ['gaming', 'reading'],
    }

    const invalidUserDto1 = {
      username: '',
      age: 28,
      hobbies: ['gaming', 'reading'],
    }

    const invalidUserDto2 = {
      username: 'Alice',
      age: -5,
      hobbies: ['gaming', 'reading'],
    }

    const invalidUserDto3 = {
      username: 'Alice',
      age: 28,
      hobbies: 'gaming',
    }

    expect(ValidationService.validateUserDto(validUserDto)).toBe(true)
    expect(ValidationService.validateUserDto(invalidUserDto1)).toBe(false)
    expect(ValidationService.validateUserDto(invalidUserDto2)).toBe(false)
    // @ts-ignore this object has wrong type
    expect(ValidationService.validateUserDto(invalidUserDto3)).toBe(false)
  })
})
