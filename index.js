import mongoose from 'mongoose';
import app from './app';

mongoose.connect('mongodb://localhost/social');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error en conexion:'));
db.once('open', () => {
  console.log('conexion exitosa');
  app.listen(3000, () => console.log('servidor corriendo en localhost:3000'));
});
