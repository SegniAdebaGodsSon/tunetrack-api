import mongoose, { Schema, Document, Types } from 'mongoose';
import Joi from 'joi';

export interface ISong extends Document {
    _id: Types.ObjectId;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

const songSchema = new Schema({
    _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true },
});


export const Song = mongoose.model<ISong>('Song', songSchema);

// post: unknown -> since the input from the user is unknown
export function validatePost(post: unknown): Joi.ValidationResult<Omit<ISong, '_id'>> {
    const schema = Joi.object({
        title: Joi.string().min(1).max(100).required(),
        artist: Joi.string().min(1).max(100).required(),
        album: Joi.string().min(0).max(100).required(),
        genre: Joi.string().min(1).max(100).required()
    })

    return schema.validate(post)
}

// post: unknown -> since the input from the user is unknown
export function validatePatch(post: unknown): Joi.ValidationResult<Partial<Omit<ISong, '_id'>>> {
    const schema = Joi.object({
        title: Joi.string().min(1).max(100).optional(),
        artist: Joi.string().min(1).max(100).optional(),
        album: Joi.string().min(0).max(100).optional(),
        genre: Joi.string().min(1).max(100).optional()
    })

    return schema.validate(post)
}
