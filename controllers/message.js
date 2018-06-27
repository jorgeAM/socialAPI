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

async function receiveMessage(req, res) {
  try {
    const { page } = req.params;
    const messages = await Message.find({
      receiver: req.user.sub,
    }).populate('emitter', 'name surname nick image').paginate(page, 4);
    res.status(200).send({ messages });
  } catch (error) {
    res.status(404).send({ error });
  }
}

async function sendedMessage(req, res) {
  try {
    const { page } = req.params;
    const messages = await Message.find({
      emitter: req.user.sub,
    }).populate('receiver', 'name surname nick image').paginate(page, 4);
    res.status(200).send({ messages });;
  } catch (error) {
    res.status(404).send({ error });
  }
}

async function getUnviewedMessages(req, res) {
  try {
    const messages = await Message.count({ viewed: false, receiver: req.user.sub });
    res.status(200).send({ messages });;
  } catch (e) {
    res.status(404).send({ error });
  }
}

export {
  sendMessage,
  receiveMessage,
  sendedMessage,
  getUnviewedMessages,
};
