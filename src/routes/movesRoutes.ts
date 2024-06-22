import {Router} from 'express'
import {movesController} from '../controllers'

const router: Router = Router()

router.get('/', movesController.getAll)

router.get('/:id', movesController.getOne)

router.post('/', movesController.add)

router.put('/update/:id', movesController.update)

router.put('/delete/:id', movesController.delete)

export default router