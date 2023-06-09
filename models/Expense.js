const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    info:{
        type: String,
        require: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    week:{
        type:Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    month:{
        type:Number,
        required: true,
    }
});

const Expense = mongoose.model('Expense',ExpenseSchema);
module.exports = Expense;