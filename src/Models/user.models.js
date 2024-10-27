import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name : {
        type: String,
        required: [true, "Name is required"],
        lowercase: true,
        trim: true,
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password : {
        type : String,
        required: [true,"Email is required"],
        trim: true
    }
})


export const User = mongoose.model("User", userSchema)