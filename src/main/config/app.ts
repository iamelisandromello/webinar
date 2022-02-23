import express from 'express'
import setupMiddleares from '@/main/config/middlewares'
import setupRoutes from '@/main/config/routes'

const app = express()
setupMiddleares(app)
setupRoutes(app)

export default app
