import usersRoutes from './usersRoutes'
import abilitiesRoutes from './abilitiesRoutes'
import typesRoutes from './typesRoutes'
import classesRoutes from './classesRoutes'
import groupsRoutes from './groupsRoutes'
import movesRoutes from './movesRoutes'
import pkmnRoutes from './pkmnRoutes'

import {Router} from 'express'

const router: Router = Router()

router.use('/auth', usersRoutes)
router.use('/abilities', abilitiesRoutes)
router.use('/types', typesRoutes)
router.use('/classes', classesRoutes)
router.use('/groups', groupsRoutes)
router.use('/moves', movesRoutes)
router.use('/pokemon', pkmnRoutes)

export default router