import Router from 'express'
import StarshipController from '../controllers/starship.controller'

const router = Router()

router.get('/starships/:id', StarshipController.getStarship)
router.get('/starships', StarshipController.getStarships)
router.post('/starships', StarshipController.setStarships)

export default router