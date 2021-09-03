import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  
    @Prop({type:Object})
    result:{}

    @Prop()
    status:boolean

    @Prop()
    message:string

    // @Prop()
    // userId: string;

    // @Prop()
    // username: string;

    // @Prop()
    // email: string;

    // @Prop()
    // password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);