import './config/module-alias'
import { variables } from '@/main/config/variables'
import app from '@/main/config/app'

const port = variables.port

app.listen(port, () => console.log(`Server running at: http:localhost:${port}`))
