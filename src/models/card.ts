import mongoose from 'mongoose';

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true },
  likes: { type: [Schema.Types.ObjectId], default: [] },
  createdAt: { type: Date, default: Date.now },
});

interface ICard {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export const Card = mongoose.model<ICard>('card', cardSchema);
