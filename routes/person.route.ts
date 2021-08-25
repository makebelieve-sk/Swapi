import Router from 'express'
import PersonController from '../controllers/person.controller'

const router = Router()

router.get('/people/:id', PersonController.getPerson)
router.get('/people', PersonController.getPeople)
router.post('/people', PersonController.setPeople)

export default router