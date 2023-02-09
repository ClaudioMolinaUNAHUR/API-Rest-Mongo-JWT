import {Schema, model} from "mongoose";
import bcrypt from 'bcryptjs';

//import mongoose from "mongoose";
//const {Schema, model} = mongoose;

const userSchema = new Schema({
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    password:{
        type: String,
        require: true,
    },
});

userSchema.pre('save', async function(next) { // se trabaja con function para tener scope del "this"
    if(!this.isModified('password')){
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash
        next()
    } catch (error) {
        throw new Error('fallto el hash de pass :' + error)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

export const User = model("User", userSchema);

