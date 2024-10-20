import { IncomingMessage, ServerResponse } from 'http'
import { UserService } from '../services/users'
import { ValidationService } from '../services/validation'
import { CreateUserDto, UpdateUserDto } from '../types/dto'
import { jsonResponse } from '../utils/json-response'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  getAllUsers(req: IncomingMessage, res: ServerResponse) {
    try {
      const users = this.userService.getAllUsers()
      jsonResponse(res, 200, users)
    } catch (error) {
      jsonResponse(res, 500, { message: 'Internal Server Error' })
    }
  }

  getUserById(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url?.split('/').pop()
    if (!ValidationService.validateId(userId)) {
      jsonResponse(res, 400, { message: 'Invalid user ID' })
      return
    }

    try {
      const user = this.userService.getUserById(userId!)
      if (user) {
        jsonResponse(res, 200, user)
      } else {
        jsonResponse(res, 404, { message: 'User not found' })
      }
    } catch (error) {
      jsonResponse(res, 500, { message: 'Internal Server Error' })
    }
  }

  createUser(req: IncomingMessage, res: ServerResponse) {
    let body: string = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      const userDto: CreateUserDto = JSON.parse(body)

      if (!ValidationService.validateUserDto(userDto)) {
        jsonResponse(res, 400, { message: 'Invalid user data' })
        return
      }

      try {
        const newUser = this.userService.createUser(userDto)
        jsonResponse(res, 201, newUser)
      } catch (error) {
        jsonResponse(res, 500, { message: 'Internal Server Error' })
      }
    })
  }

  updateUser(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url?.split('/').pop()
    if (!ValidationService.validateId(userId)) {
      jsonResponse(res, 400, { message: 'Invalid user ID' })
      return
    }

    let body: string = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      const userDto: UpdateUserDto = JSON.parse(body)
      userDto.userId = userId!

      if (!ValidationService.validateUserDto(userDto)) {
        jsonResponse(res, 400, { message: 'Invalid user data' })
        return
      }

      try {
        const updatedUser = this.userService.updateUser(userDto)
        if (updatedUser) {
          jsonResponse(res, 200, updatedUser)
        } else {
          jsonResponse(res, 404, { message: 'User not found' })
        }
      } catch (error) {
        jsonResponse(res, 500, { message: 'Internal Server Error' })
      }
    })
  }

  deleteUser(req: IncomingMessage, res: ServerResponse) {
    const userId = req.url?.split('/').pop()
    if (!ValidationService.validateId(userId)) {
      jsonResponse(res, 400, { message: 'Invalid user ID' })
      return
    }

    try {
      const isDeleted = this.userService.deleteUser(userId!)
      if (isDeleted) {
        jsonResponse(res, 204, {}) // No content
      } else {
        jsonResponse(res, 404, { message: 'User not found' })
      }
    } catch (error) {
      jsonResponse(res, 500, { message: 'Internal Server Error' })
    }
  }
}
