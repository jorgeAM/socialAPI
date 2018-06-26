import Follow from '../models/follow';
import Publication from '../models/publication';
import User from '../models/user';
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import 'mongoose-pagination';

async function addPublication(req, res) {
  try {
    const { body } = req;
    if (!body.text) return res.status(200).send({ message: 'Debes escribir algo!!' });
    const newPublication = new Publication();
    newPublication.text = body.text;
    newPublication.file = null;
    newPublication.user = req.user.sub;
    const publication = await newPublication.save();
    res.status(200).send({ publication });
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function getPublications(req, res) {
  try {
    const { page } = req.params;
    const me = req.user.sub;
    const follows = await Follow.find({ user: me }).populate('followed').select('-_id followed');

    // Tambien sirve
    //const follows = await Follow.find({ user: me }).select('-_id followed');
    const followed = [];
    follows.forEach((follow) => {
      followed.push(follow.followed);
    });
    const pubications = await Publication.find({
      user: {
        $in: followed,
      },
    }).sort('created_at').populate('user').paginate(page, 3);
    res.status(200).send({ pubications });
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function getPublication(req, res) {
  try {
    const { id } = req. params;
    const publication = await Publication.findById(id).populate('user');
    res.status(200).send({ publication });
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function deletePublication(req, res) {
  try {
    const { id } = req. params;
    const publication = await Publication.findById(id);
    if (publication.user._id == req.user.sub) {
      publication.remove();
      res.status(200).send({ publication });
    }else res.status(200).send({ message: 'Sólo puedes eliminar tus propias publicaciones' });
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function uploadFileInPublication(req, res) {
  try {
    const { id } = req.params;
    if (req.files) {
      let path = req.files.file.path;
      let array = path.split('/');
      let file = array[2];
      let type = req.files.file.type;
      if (type == 'image/jpeg' || type == 'image/png' || type == 'image/jpg') {
        const publication = await Publication.findByIdAndUpdate(id, { file }, { new: true });
        res.status(200).send({ publication });
      }else {
        fs.unlinkSync(req.files.file.path);
        res.status(500).send({ message: 'Solo puedes subir imágenes' });
      }
    }else {
      res.status(500).send({ message: 'Sube una archivo' });
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

function getFilesPublication(req, res) {
  const { image } = req.params;
  const ruta = `./uploads/publications/${image}`;
  fs.stat(ruta, (err, stats) => {
    if (err) res.status(500).send({ err });
    res.sendFile(path.resolve(ruta));
  });
}

export {
  addPublication,
  getPublications,
  getPublication,
  deletePublication,
  uploadFileInPublication,
  getFilesPublication,
};
