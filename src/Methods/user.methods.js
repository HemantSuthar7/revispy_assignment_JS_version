import mongoose from "mongoose"
import {User} from "../Models/user.models.js"

const registerUser = async ({name, email, password}) => {

    // Algorithm for registering the user

    // 1. Get the name, email & password and make sure that they pass all of the common validations.
    // 2. We need to check that if the email already exists or not, if it does, them redirect the user to log in.
    // 3. If the email does not exists already than we can move further.
    // 4. Then we just need to save the user's name, email and password.
    // 5. On successfully registering the user, we need to send a response.



    // Validation for String type

    if (
        [name, email, password].some((field) => typeof field !== "string")
    ){
        throw new Error("The Data type should be of String type, Please make sure all of the fields are of String format.")
    }


    // Validation for empty strings

    if (
        [name, email, password].some( (field) => field?.trim() === "" )
    ){
        throw new Error("You cannot provide empty field values.")
    }


    // Validation for email pattern match will be done in the signup component itself.


    // Just for safety purpose, lower the email and name

    const lowerName = name.toLowerCase();
    const lowerEmail = email.toLowerCase();


    // Check if the user already exists:

    const existedUser = await User.findOne({
        email : lowerEmail
    })

    if (existedUser) {
        throw new Error("The user with this email already exists")
    }


    // Create the user 

    const user = await User.create({
        name: lowerName,
        email: lowerEmail,
        password // ES6 syntax !!
    })


    // check if user is created 
    const createdUser = await User.findById(user._id).select("-password")

    if (!createdUser) {
        throw new Error("Something went wrong while registering the user")
    }


    console.log("The user is created successfully")
    return createdUser

}



const loginUser = async ({email, password}) => {


    // Algorithm for loggin in the user 

    // 1. Get the email & password and make sure that they pass all of the common validations.
    // 2. check if the email already exists or not, if it does not exists then prompt the user to register first.
    // 3. But if the email exists then continue further.
    // 4. Now set the IsloggedIn cookie to true and also set the userId cookie along.



    // Validation for String type

    if (
        [email, password].some((field) => typeof field !== "string")
    ){
        throw new Error("The Data type should be of String type, Please make sure all of the fields are of String format.")
    }


    // Validation for empty strings

    if (
        [email, password].some( (field) => field?.trim() === "" )
    ){
        throw new Error("You cannot provide empty field values.")
    }


    // Validation for email pattern match will be performed in the login component itself.


    // Just for safety purpose, lower the email 

    const lowerEmail = email.toLowerCase();


    // Check if the user already exists:

    const existedUser = await User.findOne({
        email : lowerEmail
    })

    if (!existedUser) {
        throw new Error("The user with this email does not exists, Please register yourself first.")
    }


    // The cookies will be set by the login component itself, we will just return the user data
    // Two cookies should be set, which are : IsLoggedIn to true and userId with the userId whose value will be the _id from the user details.

    console.log("The User login is successfull, now set the cookies.")

    return existedUser


}



const logOutUser = async () => {

}


const getCurrentUser = async () => {
    
}


export {
    registerUser,
    loginUser
}