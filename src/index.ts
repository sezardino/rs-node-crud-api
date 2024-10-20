import http, { IncomingMessage, ServerResponse } from 'http'
import { jsonResponse } from './utils/json-response'

const API_PREFIX = '/api'

export const createServer = () => {
  const server = http.createServer(
    (req: IncomingMessage, res: ServerResponse) => {
      const method = req.method
      const urlWithApi = req.url

      if (!urlWithApi?.startsWith(API_PREFIX))
        return jsonResponse(res, 404, { error: 'Route not found' })

      const url = urlWithApi.replace(API_PREFIX, '')

      switch (url) {
        case '':
          jsonResponse(res, 200, { message: 'Welcome to the API!' })
          break
        default:
          jsonResponse(res, 404, { error: 'Route not found' })
          break
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
