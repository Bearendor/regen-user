import { Request, Response, NextFunction } from 'express';
import sequelize from 'sequelize';
import { Model, Options } from 'sequelize';
import { Where } from 'sequelize/types/lib/utils';
import logger from '../lib/logger';
import error from '../lib/error';

export class BaseService {
  entity: sequelize.ModelCtor<sequelize.Model<any, any>>;
  name: string;
  constructor(name: string, entity: any) {
    this.entity = entity;
    this.name = name
  }


  async findOne(req: Request, query: any, options: any = {}) {
    try {
      options.where = query;
      const data = await this.entity.findOne(options);
      logger.info(req, `${this.name} service - Successfully found one with query: ${JSON.stringify(query)}`);
      return data;
    } catch (err) {
      logger.error(req, `${this.name} service - Error in finding one with query ${JSON.stringify(query)}`, err)
      throw err;
    }
  }

  async findById(req: Request, id: number, options: any = {}) {
    try {
      options.where = {
        id
      };
      const data = await this.entity.findOne(options);
      logger.info(req, `${this.name} service - Successfully found one with id: ${id}`);
      return data;
    } catch (err) {
      logger.error(req, `${this.name} service - Error in finding one with id ${id}`, err)
      throw err;
    }
  }

  async findAll(req: Request, options: any = {}) {
    try {
      options.where = {};
      const data = await this.entity.findAll(options);
      logger.info(req, `${this.name} service - Successfully in finding all `);
      return data;
    } catch (err) {
      logger.error(req, `${this.name} service - Error in finding all`, err)
      throw err;
    }
  }

  async findMany(req: Request, query: any, options: any = {}) {
    try {
      options.where = query;
      const data = await this.entity.findAll(options);
      logger.info(req, `${this.name} service - Successfully found many with query: ${JSON.stringify(query)} `);
      return data;
    } catch (err) {
      logger.error(req, `${this.name} service - Error in finding many with query: ${JSON.stringify(query)}`, err)
      throw err;
    }
  }

  async create(req: Request, body: object, options: any = {}) {
    try {
      const data = await this.entity.create(body, options);
      logger.info(req, `${this.name} service - Successfully created with body:`);
      return data;
    } catch (err) {
      logger.error(req, `${this.name} service - Error in creating with body: `, err);
      throw err;
    }
  }

  async update(req: Request, id: number, body: object, options: any = {}) {
    try {
      options.where = { id };
      const data = await this.entity.update(body, options);
      logger.info(req, `${this.name} service - Successfully updated Entity with id: ${id}`);
      return data;
    } catch (err) {
      logger.error(req, `${this.name} service - Error updating Entity with id: ${id} `, err);
      throw err;;
    }
  }

  async delete(req: Request, id: number, options: any = {}) {
    try {
      options.where = { id };
      const data = await this.entity.destroy(options);
      logger.info(req, `${this.name} service - Successfully deleted Entity with id: ${id} `);
      return data;
    } catch (err) {
      logger.error(req, `${this.name} service - Error deleting Entity with id: ${id} `, err);
      throw err;;
    }
  }
}