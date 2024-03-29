import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    isRequired: true,
  })
  name: string;

  @Prop({
    isRequired: true,
    isInteger: true,
  })
  age: number;
}

export const userSchema = SchemaFactory.createForClass(User);
