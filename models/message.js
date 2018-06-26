import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = Schema({
  emitter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  viewed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Message', messageSchema);
