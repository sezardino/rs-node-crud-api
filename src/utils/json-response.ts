import { ServerResponse } from 'http'

export const jsonResponse = (
  res: ServerResponse,
  statusCode: number,
  data: any
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}
