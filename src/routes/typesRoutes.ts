import {Router} from 'express'
import {typesController} from '../controllers'

const router: Router = Router()

router.get('/', typesController.getAll)

router.get('/:id', typesController.getOne)

router.post('/', typesController.add)

router.put('/update/:id', typesController.update)

router.put('/delete/:id', typesController.delete)

export default router