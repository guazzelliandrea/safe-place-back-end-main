import {Request, Response} from 'express'
import Knex from '../database/connection'

interface Assessment {
  assessment_id: number
  has: boolean
}


export default class PointsController {
  async store(req: Request, res: Response) {
      const point = {...req.body}
      delete point.assessments
      const trx = await Knex.transaction()
      const newPoint = await trx('points').insert(point)
      const items = req.body.assessments.map((assessment : Assessment) => ({
        ...assessment,
        point_id: newPoint[0]
      }))
      await trx('point_assessments').insert(items)
      await trx.commit()
      res.json({success: true})
    
  }

  async index(req: Request, res: Response){
    const { title, assessments, uf, citys } = req.query
    const assessmentsList = assessments ? String(assessments)
    .split(',')
    .map(item => Number(item.trim())) : null

    const citysList = citys ? String(citys)
    .split(',')
    .map(item => item.trim().toLowerCase()) : null
    const points = await Knex('points')
    .join('point_assessments', 
      "points.id",
      "=", 
      "point_assessments.point_id")
      .distinct()
      .select('points.*')
      .modify(queryBuilder => {
        if(assessmentsList ||assessmentsList?.length > 0) {
          console.log(assessmentsList)
          queryBuilder.whereIn("point_assessments.assessment_id", assessmentsList)
          .andWhere('point_assessments.has','=', true )
        } 

        if(title){
          queryBuilder.andWhere("points.title", "like", `%${title}%`)
        }

        if(uf) {
          queryBuilder.andWhere("points.uf", "=", uf)
        }

        if(citysList || citysList?.length > 0) {
          queryBuilder.whereIn("points.city", citysList)
        }

      })

    res.json(points)
  }

  async show(req: Request, res: Response){
    const {id} = req.params
    const point = await Knex('points')
    .where('id', id)
    .first()

    const assessments = await Knex('assessments').join(
      "point_assessments", 
      "assessments.id",
      "=", 
      "point_assessments.assessment_id"
    )
    .where('point_assessments.point_id', id)
    .select(
    "assessments.assessment", 
    "point_assessments.has"
    )

    res.json({
      ...point,
      assessments
    })
  }

}