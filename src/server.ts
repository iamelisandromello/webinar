import './main/config/module-alias'
import { variables } from '@/main/config/variables'
import { LoginController} from './controllers/login'
import express from 'express'
import { json } from 'express'
import { Request, Response, NextFunction, Router } from 'express'

const port = variables.port
const app = express()

const router = Router()
const bodyParser = json() 
const contentType = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}

app.use(contentType)
app.use(bodyParser)


const login = router.post('/login', (req, res) => {
  const loginController = new LoginController()
  const data = loginController.handle(req)
  return res.json(data)
})

app.use(login)

app.listen(port, () => console.log(`Server running at: http:localhost:${port}`))

export default app
