const mongoose = require('mongoose');
const {Schema} =mongoose;
const CategorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    user:{
    type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    budget:{
        type: Number,
        require:true,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports= Category;