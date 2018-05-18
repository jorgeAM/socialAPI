import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/social');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error en conexion:'));
db.once('open', () => console.log('conexion exitosa'));
