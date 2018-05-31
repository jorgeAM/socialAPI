import Follow from '../models/follow';
import User from '../models/user';
import 'mongoose-pagination';

async function followUser(req, res) {
  try {
    const { body } = req;
    const checkFollow = await Follow.find({
      user: req.user.sub,
      followed: body.followed,
    });
    if (checkFollow.length > 0) {
      res.status(200).send({ message: 'Ya sigues a este usuario' });
    }else {
      const newFollow = new Follow();
      newFollow.user = req.user.sub;
      newFollow.followed = body.followed;
      const follow = await newFollow.save();
      res.status(200).send({ follow });
    }
  } catch (err) {
    res.status(500).send({ err });
  }
}

async function unFollowUser(req, res) {
  try {
    const { body } = req;
    const unFollow = await Follow.deleteOne({
      user: req.user.sub,
      followed: body.followed,
    });
    if (unFollow.n === 1) {
      res.status(500).send({ message: 'Se dejo de seguir al usuario' });
    } else res.status(500).send({ message: 'no se encontró registro para eliminar' });
  } catch (e) {
    res.status(500).send({ err });
  }
}

export {
  followUser,
  unFollowUser
};
