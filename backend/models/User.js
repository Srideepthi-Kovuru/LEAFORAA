import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    addresses: [
      {
        id: String,
        label: String,
        fullName: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        isDefault: Boolean,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre('save', async function nextHook() {
  if (!this.isModified('password')) {
    return nextHook();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
