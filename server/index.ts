import express from 'express'
import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(cors({origin: '*'}))
app.use(express.json({
    limit: '100mb'
}))
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/cloudinary', (req, res) => {
    res.send('Hello Cloudinary!')
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
app.post('/upload', (req, res) => {
    const {file}: {file: string} = req.body
    if (!file) {
        res.status(400).json({error: 'No file uploaded'})
        return
    }
    cloudinary.uploader.upload(file, (err, result) => {
        if (err) {
            return res.status(400).json({error: err.message})
        }
        res.json({url: result?.secure_url})
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
