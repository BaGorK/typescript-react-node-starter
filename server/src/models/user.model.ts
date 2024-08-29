import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  phone?: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (this: UserDocument, val: string) {
          return val === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Hash the password before save
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

const User = mongoose.model('User', userSchema);

export default User;


