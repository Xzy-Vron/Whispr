import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
    content : string,
    createdAt : Date
}

const messageSchema: Schema<Message> = new Schema({
    content : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date, 
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username : string,
    password : string,
    email : string,
    verifyCode : string,
    verifyCodeExpire : Date,
    isVerified : boolean,
    isAcceptingMessage : boolean,
    messages : Message[], 
}

const userSchema: Schema<User> = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    password : {
        type: String,
        required: [true,"Password is required"]
    },
    email : {
        type: String,
        required:[true, "Email is required"],
        unique:true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please provide a valid email"]
    },
    verifyCode : {
        type: String,
        required: [true,"Verify code is required"]
    },
    verifyCodeExpire : {
        type: Date,
        required: [true,"Verify Code Expiry is required"]
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    isAcceptingMessage : {
        type: Boolean,
        default: true
    },
    messages : [messageSchema]
})

const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', userSchema);

export default User;