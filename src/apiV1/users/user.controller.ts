import { Request, Response } from 'express';
import { User } from '../../db/models/user.model';

export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password', 'deletionDate'] }
      });
      if (!users) {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: users
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  }

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.params.id, {
        attributes: { exclude: ['password', 'deletionDate'] }
      });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  }

  public update = async (req: Request, res: Response): Promise<any> => {
    try {
      const userUpdated = await User.update(req.body, { where: { id: req.params.id } });
      if (!userUpdated) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: userUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  }

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.destroy({ where: { id: req.params.id } });

      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  }
}
