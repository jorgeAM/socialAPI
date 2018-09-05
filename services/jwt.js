import jwt from 'jwt-simple';
import moment from 'moment';

const secret = 'm1p455w0rd';

function codificar(user) {
  const payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix(),
  };
  return jwt.encode(payload, secret);
}

function decodificar(token) {
  return jwt.decode(token, secret);
}

export {
  codificar,
  decodificar
};
