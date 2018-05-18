import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const publicationSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  file: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Publication', publicationSchema);
