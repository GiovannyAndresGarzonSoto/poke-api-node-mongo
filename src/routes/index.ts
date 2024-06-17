import usersRoutes from './usersRoutes'
import abilitiesRoutes from './abilitiesRoutes'
import typesRoutes from './typesRoutes'

import {Router} from 'express'

const router: Router = Router()

router.use('/auth', usersRoutes)
router.use('/abilities', abilitiesRoutes)
router.use('/types', typesRoutes)

export default router