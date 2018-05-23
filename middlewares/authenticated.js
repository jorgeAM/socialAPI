import { decodificar } from '../services/jwt';
import moment from 'moment';

export const isAuth = function (req, res, next) {
  if (!req.headers.authorization) {
    res.status(403).send({ message: 'La petición no tiene la cabecera de autenticación' });
  }else {
    let token = req.headers.authorization;
    try {
      const user = decodificar(token);
      if (user.exp <= moment().unix()) {
        res.status(401).send({ message: 'Token expirado' });
      }else {
        req.user = user;
      }
    } catch (ex) {
      res.status(404).send({ message: 'Token inválido' });
    }

    next();
  }
};
