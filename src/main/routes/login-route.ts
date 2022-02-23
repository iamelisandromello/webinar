import { LoginController } from '@/controllers/login'

import { Router} from 'express'

export default (router: Router): void => {
  router.post('/login', async (req, res) => {
    const loginController = new LoginController()
    const data = await loginController.handle(req)
    return res.json(data)
  })
}

/* export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
} */
