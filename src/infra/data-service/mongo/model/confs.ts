import { randomUUID as uuidv4 } from 'node:crypto';

export const defaultSchemaOptions = { versionKey: false, timestamps: true };

export const defaultIdOptions = { type: String, default: uuidv4 };
