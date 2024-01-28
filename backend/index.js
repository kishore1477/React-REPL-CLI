import express, { json } from 'express'
import cors from 'cors'
import router from './router.js';
// Multer configuration for file upload
import dotenv from 'dotenv'
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use('/api',router)
const port = process.env.PORT|| 5000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})