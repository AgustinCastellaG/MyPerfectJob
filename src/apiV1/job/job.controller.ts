import { Request, Response } from 'express';
import { Op } from 'sequelize';
import jobModel from '../../db/models/job.model';
require('dotenv').config();

export default class JobController {

  public fetch = async (req: Request, res: Response): Promise<any> => {
    const { localizacion, jornada, contrato, experiencia } = req.body;
    try {
      const query: any = {};
      query.jornada = jornada;
      query.contrato = contrato;
      query.experiencia = experiencia;

      if (localizacion === 'Montevideo') {
        query.localizacion = { [Op.eq]: 'Montevideo,  Montevideo' };
      } else {
        query.localizacion = { [Op.ne]: 'Montevideo,  Montevideo' };
      }

      const jobs = await jobModel.findAll({
        attributes: { exclude: ['deletionDate'] },
        where: query
      });

      if (jobs.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'No elements found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: jobs
      });

    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.toString(),
        data: null
      });
    }
  }

}
