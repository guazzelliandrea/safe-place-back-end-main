import {Router} from 'express'
import Knex from './database/connection'
const routes = Router()

import PointsController from './controllers/pointsController'

const pointsController = new PointsController()

routes.get('/assessments', async (req, res) => {
  const assessments = await Knex('assessments').select('*')
  res.json(assessments)
})

routes.post('/points', pointsController.store)
routes.get('/points', pointsController.index)
routes.get('/points/:id', pointsController.show)


export default routes