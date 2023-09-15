import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { defaultIdOptions, defaultSchemaOptions } from './confs';

export type DummyDocument = Dummy & Document;

@Schema(defaultSchemaOptions)
export class Dummy {
  @Prop(defaultIdOptions)
  _id: string;

  @Prop()
  name: string;
}

export const DummySchema = SchemaFactory.createForClass(Dummy);
