export {};
const {Schema, model, ObjectId} = require ('mongoose')

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024**3*10},
    userSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: ObjectId, ref: 'File'}],
})
module.exports=model('UserSchema', UserSchema)