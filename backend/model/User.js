import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true,unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  password: { type: String, required: true } // Renamed from 'pass' to 'password'
});



const User = mongoose.model('User', UserSchema);

export default User