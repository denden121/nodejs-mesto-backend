import mongoose, { type Types } from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

const { Schema } = mongoose;

interface IUser {
  _id: Types.ObjectId;
  name: string;
  about: string;
  email: string;
  password: string;
  avatar: string;
}

type UserMethods = {
  verifyPassword(pass: string, validPass: string): Promise<boolean>;
  hashPassword(pass: string): Promise<string>;
};

const userSchema = new Schema<IUser & UserMethods>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => isEmail(email),
        message: 'Некорректный формат email',
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (pass: string) => isStrongPassword(pass),
        message:
          'Пароль должен содержать хотя бы одну букву в верхнем и нижнем регистре и одну цифру',
      },
      select: false,
    },
  },
);

userSchema.methods.verifyPassword = (pass: string, validPass: string) => (
  bcrypt.compare(pass, validPass)
);

userSchema.methods.hashPassword = (pass: string) => (
  bcrypt.hash(pass, 10)
);

export const User = mongoose.model('user', userSchema);
