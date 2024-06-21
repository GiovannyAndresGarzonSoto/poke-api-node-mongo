import {Router} from 'express'
import upload from '../middlewares/multer'
import {classesController} from '../controllers'

const router: Router = Router()

router.get('/', classesController.getAll)

router.get('/:id', classesController.getOne)

router.post('/', upload.single('image'), classesController.add)

router.put('/delete/:id', classesController.delete)

export default router