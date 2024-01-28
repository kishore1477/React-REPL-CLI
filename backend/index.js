import express, { json } from 'express'
import cors from 'cors'
import router from './router.js';
// Multer configuration for file upload

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api',router)
const port = 5000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})