import User from '../models/user';
import bcrypt from 'bcrypt-nodejs';
import { codificar } from '../services/jwt';
import 'mongoose-pagination';

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
      res.status(200).send({ user });
    }else {
      res.status(404).send({ message: 'Debes llenar todos los campos' });
    }
  }catch (err) {
    res.status(500).send({ err });
  }
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (user === null) {
      res.status(500).send({ message: 'Usuario no existe' });
    }else {
      if (bcrypt.compareSync(password, user.password)) {
        if (req.body.getToken) {
          // Devolvemos token
          const token = codificar(user);
          res.status(200).send({ token });
        }else {
          res.status(200).send({ user });
        }
      }else {
        res.status(404).send({ message: 'Contraseña incorrecta' });
      }
    }
  }catch (err) {
    res.status(500).send({ err: err });
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function getUsers(req, res) {
  try {
    const { page } = req.params;
    const users = await User.find().paginate(page, 5);
    res.status(200).send({ users });
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function updateProfile(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    if (id == req.user.sub) {
      const user = await User.findByIdAndUpdate(id, body, { new: true });
      res.status(200).send({ user });
    }else res.status(200).send({ message: 'No puedes actualizar un perfil que no sea el tuyo' });
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function uploadAvatar(req, res) {
  const { id } = req.params;
}

export {
  signUp,
  signIn,
  getUser,
  getUsers,
  updateProfile,
};
