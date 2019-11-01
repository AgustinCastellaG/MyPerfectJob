import { Request, Response } from 'express';
import { Op } from 'sequelize';
import jobModel from '../../db/models/job.model';
require('dotenv').config();

export default class JobController {

  public fetch = async (req: Request, res: Response): Promise<any> => {
    const { localizacion, jornada, contrato, experiencia } = req.body;
    try {
      const query: any = {};
      if (jornada) {
        if (jornada === 'Tiempo Completo') {
          query.jornada = {
            [Op.or]: [
              { [Op.eq]: 'Full time' },
              { [Op.eq]: 'Tiempo Completo' }
            ]
          };
        } else if (jornada === 'Medio Tiempo') {
          query.jornada = {
            [Op.or]: [
              { [Op.eq]: 'Medio Tiempo' },
              { [Op.eq]: 'Part time' }
            ]
          };
        } else {
          query.jornada = jornada;
        }
      }
      if (contrato) {
        query.contrato = contrato;
      }
      if (experiencia) {
        query.experiencia = experiencia;
      }

      if (localizacion) {
        if (localizacion === 'Montevideo') {
          query.localizacion = {
            [Op.or]: [
              { [Op.eq]: 'Montevideo,  Montevideo' },
              { [Op.eq]: 'Montevideo' }
            ]
          };
        } else {
          query.localizacion = { [Op.ne]: 'Montevideo,  Montevideo' };
        }
      }

      const jobs = await jobModel.findAll({
        attributes: { exclude: ['deletionDate'] },
        where: query
      });

      if (!jobs) {
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

  public get = async (req: Request, res: Response): Promise<any> => {
    try {
      const jobs = await jobModel.findAll({
        attributes: { exclude: ['deletionDate'] }
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
