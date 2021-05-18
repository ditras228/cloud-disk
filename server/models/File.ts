export {};
const {model, Schema, ObjectId}= require('mongoose')

const FileSchema = new  Schema({
    name:{type: String, required: true},
    type:{type: String, required: true},
    accessLink:{type: String},
    size:{type: Number, default:0},
    path:{type: String, default: ''},
    user:{type: ObjectId, ref: 'User'},
    data:{type: Date, default: Date.now()},
    parent:{type: ObjectId, ref: 'File'},
    childs:[{type: ObjectId, ref: 'User'}],
})
module.exports=model('File', FileSchema)