import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../dist/uploads'))
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileFilter = (req, file, callback) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
        callback(new Error('Only images are allowed'), false)
        return
    }
    callback(null, true)
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

export default upload