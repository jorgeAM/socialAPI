import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const followSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followed: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Follow', followSchema);
