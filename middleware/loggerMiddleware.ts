import { NextApiRequest, NextApiResponse } from "next"
import logger from "../logger"

const loggerMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  logger.info(`${req.method} Request to ${req.url}`)
  next()
}

export default loggerMiddleware
