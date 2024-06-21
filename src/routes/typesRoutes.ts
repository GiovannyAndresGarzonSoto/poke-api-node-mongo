import {Router} from 'express'
import upload from '../middlewares/multer'
import {typesController} from '../controllers'

const router: Router = Router()

router.get('/', typesController.getAll)

router.get('/:id', typesController.getOne)

router.post('/', upload.single('image'), typesController.add)

router.put('/delete/:id', typesController.delete)

export default router