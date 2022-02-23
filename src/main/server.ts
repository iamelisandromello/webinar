import './config/module-alias'
import { variables } from './config/variables'

import app from './config/app' 

app.listen(variables.port, () => console.log(`Server running at: http:localhost:${variables.port}`))

export default app
