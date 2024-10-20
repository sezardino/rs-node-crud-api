import http, { IncomingMessage, ServerResponse } from 'http'
import { UserController } from './controlers/users'
import { UserService } from './services/users'
import { jsonResponse } from './utils/json-response'

const userService = new UserService()
const userController = new UserController(userService)

const API_PREFIX = 'api'

const urls = {
  home: `/${API_PREFIX}`,
  users: `/${API_PREFIX}/users`,
  user: `/${API_PREFIX}/users/`,
}

export const createServer = () => {
  const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      const method = req.method
      const url = req.url

      if (!url?.startsWith(`/${API_PREFIX}`))
        return jsonResponse(res, 404, { error: 'Route not found 123' })

      if (url === urls.home) {
        jsonResponse(res, 200, { message: 'Welcome to the API!' })
      } else if (url === urls.users) {
        switch (method) {
          case 'GET':
            userController.getAllUsers(req, res)
            break
          case 'POST':
            userController.createUser(req, res)
            break
          default:
            jsonResponse(res, 405, { message: 'Method Not Allowed' })
            break
        }
      } else if (url.startsWith(urls.user)) {
        switch (method) {
          case 'GET':
            userController.getUserById(req, res)
            break
          case 'PUT':
            userController.updateUser(req, res)
            break
          case 'DELETE':
            userController.deleteUser(req, res)
            break
          default:
            jsonResponse(res, 405, { message: 'Method Not Allowed' })
            break
        }
      } else {
        jsonResponse(res, 404, { error: 'Route not found' })
      }
    }
  )

  return server
}

const PORT = process.env.PORT || 3000

const server = createServer()

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
