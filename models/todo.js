const {Schema,model, Types} = require('mongoose')

const schema = new Schema({
    title:{type: String, required: true},
    describe:{type:String, required:true},
    date:{type:Date,default: Date.now},
    completed:{type:Boolean,default:false},
    owner: {type:Types.ObjectId, ref: "User"}

});
module.exports = model("Todo", schema)