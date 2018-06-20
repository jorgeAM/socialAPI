import User from '../models/user';
import Follow from '../models/follow';
import bcrypt from 'bcrypt-nodejs';
import { codificar } from '../services/jwt';
import fs from  'fs';
import path from 'path';
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
    const user = await User.findOne({ email });
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

    // Si sigo a este usuario
    const followed = await Follow.findOne({
      user: req.user.sub,
      followed: user._id,
    });

    // Si este usuario me sigue
    const follower = await Follow.findOne({
      user: user._id,
      followed: req.user.sub,
    });
    res.status(200).send({ user, followed, follower });
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function getUsers(req, res) {
  try {
    const { page } = req.params;

    // usuarios que seguimos
    const followed = await Follow.find({ user: req.user.sub }).select('-_id followed');

    // usuarios que me siguen
    const follower = await Follow.find({ followed: req.user.sub }).select('-_id user');
    const users = await User.find().paginate(page, 5);
    res.status(200).send({ users, followed, follower });
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function getCounters(req, res) {
  try {
    if (req.params.id) {
      const countOfFollowed = await Follow.count({ user: req.params.id });
      const countOfFollower = await Follow.count({ followed: req.params.id });
      res.status(200).send({ countOfFollowed, countOfFollower });
    }else {
      const countOfFollowed = await Follow.count({ user: req.user.sub });
      const countOfFollower = await Follow.count({ followed: req.user.sub });
      res.status(200).send({ countOfFollowed, countOfFollower });
    }
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
  try {
    const { id } = req.params;
    if (id == req.user.sub) {
      if (req.files) {
        let path = req.files.avatar.path;
        let array = path.split('/');
        let image = array[2];
        let type = req.files.avatar.type;
        console.log(type);
        if (type == 'image/jpeg' || type == 'image/png' || type == 'image/jpg') {
          const user = await User.findByIdAndUpdate(id, { image }, { new: true });
          res.status(200).send({ user });
        }else {
          fs.unlinkSync(req.files.avatar.path);
          res.status(500).send({ message: 'Solo puedes subir imágenes' });
        }
      }else {
        res.status(500).send({ message: 'Sube una imagen' });
      }
    }else {
      if (req.files) fs.unlinkSync(req.files.avatar.path);
      res.status(200).send({ message: 'No puedes subir avatar de un perfil que no sea el tuyo' });
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

function getAvatar(req, res) {
  const { avatar } = req.params;
  const ruta = `./uploads/users/${avatar}`;
  fs.stat(ruta, (err, stats) => {
    if (err) res.status(500).send({ err });
    res.sendFile(path.resolve(ruta));
  });
}

export {
  signUp,
  signIn,
  getUser,
  getUsers,
  getCounters,
  updateProfile,
  uploadAvatar,
  getAvatar,
};
