import express from 'express'
import controller from './controller.js'
const router = express.Router()
router.post('/upload', controller.uploadFile)
router.delete('/delete/:filename',controller.deleteFile)

export default router