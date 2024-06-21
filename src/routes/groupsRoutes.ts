import {Router} from 'express'
import {groupsController} from '../controllers'

const router: Router = Router()

router.get('/', groupsController.getAll)

router.get('/:id', groupsController.getOne)

router.post('/', groupsController.add)

router.put('/update/:id', groupsController.update)

router.put('/delete/:id', groupsController.delete)

export default router