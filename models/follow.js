import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const followSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followed: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('Follow', followSchema);
