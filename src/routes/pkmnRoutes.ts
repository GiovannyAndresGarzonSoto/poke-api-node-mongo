import {Router} from 'express'
import upload from '../middlewares/multer'
import {pkmnController} from '../controllers'

const router: Router = Router()

router.get('/', pkmnController.getAll)

router.get('/:id', pkmnController.getOne)

router.post('/', upload.single('image'), pkmnController.add)

router.put('/delete/:id', pkmnController.delete)

export default router