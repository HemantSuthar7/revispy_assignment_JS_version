import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
    categoryName : {
        type: String,
        required: [true, "Category-Name is required"],
        lowercase: true,
        trim: true,
        unique: true // this can cause issue as faker.js can send duplicate results.
    },
    checked : {
        type: Boolean,
        required: [true, "checked value is required"],
    },
    checkedByUser : {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})