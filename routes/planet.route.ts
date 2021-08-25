import Router from 'express'
import PlanetController from '../controllers/planet.controller'

const router = Router()

router.get('/planets/:id', PlanetController.getPlanet)
router.get('/planets', PlanetController.getPlanets)
router.post('/planets', PlanetController.setPlanets)

export default router