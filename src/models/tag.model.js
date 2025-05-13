const {Schema, model} = require("mongoose")
const DOCUMENT_NAME =  'Tag'
const COLLECTTION_NAME = 'tag'


// Declare the Schema of the Mongo model
var tagSchema = new Schema({
    name: {type: String, require: true},
    priority: {type: Number, require: true, default:1}
},{
    collection: 'tag',
    timestamps: false
});

//Export the model
module.exports = mongoose.model('Tag', tagSchema);