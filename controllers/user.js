import User from '../models/user';
import bcrypt from 'bcrypt-nodejs';

async function signUp(req, res) {
  try {
    const { body } = req;
    const newUser = new User();
    if (body.name && body.surname && body.nick
      && body.email && body.password) {
      newUser.name = body.name;
      newUser.surname = body.surname;
      newUser.nick = body.nick;
      newUser.email = body.email;
      newUser.password = bcrypt.hashSync(body.password);
      const user = await newUser.save();
      res.status(200).send({ user: user });
    }else {
      res.status(200).send({ message: 'Debes llenar todos los campos' });
    }
  }catch (err) {
    res.status(500).send({ err: err });
  }
}

export {
  signUp,
};
