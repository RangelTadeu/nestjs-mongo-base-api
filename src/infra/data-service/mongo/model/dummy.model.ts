import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { defaultIdOptions, defaultSchemaOptions } from './confs';

@Schema(defaultSchemaOptions)
export class Dummy {
  @Prop(defaultIdOptions)
  _id: string;

  @Prop()
  name;
}

export const DummySchema = SchemaFactory.createForClass(Dummy);
