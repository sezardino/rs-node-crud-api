import { validate as isUuid } from 'uuid'
import { CreateUserDto } from '../types/dto'

export class ValidationService {
  static validateId(id?: string): boolean {
    if (!id) return false

    return isUuid(id)
  }

  static validateUserDto(dto: CreateUserDto): boolean {
    const { username, age, hobbies } = dto
    const isValidUsername =
      typeof username === 'string' && username.trim().length > 0
    const isValidAge = typeof age === 'number' && age > 0
    const isValidHobbies =
      Array.isArray(hobbies) &&
      hobbies.every((hobby) => typeof hobby === 'string')

    return isValidUsername && isValidAge && isValidHobbies
  }
}
