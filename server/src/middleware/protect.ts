import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const protectBackend = async (req: Request, res: Response, next: NextFunction) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    req.body.user = {};
    res.status(400).send('Required Need Authorization header!');
  } else {
    try {
      const object: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.body.user = object?.userid;
      next();
    } catch (error) {
      res.status(200).send({ code: 201, message: 'Invalid Token' });
    }
  }
}

const protectClient = async (req: Request, res: Response, next: NextFunction) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    req.body.user = {};
    res.status(400).send('Required Need Authorization header!');
  } else {
    try {
      if (token === process.env.JWT_SECRET_KEY) {
        next();
      } else {
        res.status(200).send({ code: 201, message: 'Invalid Token' });
      }
    } catch (error) {
      res.status(200).send({ code: 201, message: 'Invalid Token' });
    }
  }
}

export { protectBackend, protectClient }
