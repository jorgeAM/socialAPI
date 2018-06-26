import Message from '../models/message';
import User from '../models/user';
import 'mongoose-pagination';

async function sendMessage(req, res) {
  try {
    const { body } = req;
    const newMessage = new Message();
    if (body.text && body.receiver) {
      newMessage.text = body.text;
      newMessage.receiver = body.receiver;
      newMessage.emitter = req.user.sub;
      const message = await newMessage.save();
      res.status(200).send({ message });
    }else res.status(404).send({ message: 'Debes llenar todos los campos' });
  } catch (error) {
    res.status(404).send({ error });
  }
}

export {
  sendMessage,
};
