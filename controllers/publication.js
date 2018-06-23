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

}

export {
  addPublication,
  getPublications,
};
