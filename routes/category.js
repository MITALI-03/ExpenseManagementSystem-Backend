const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const Expense = require('../models/Expense');
const fetchuser=require ('../middleware/fetchuser')

router.post('/addCategory', fetchuser, [
    body('budget').isNumeric({ min: 100 })     //Using express-validator
], async (req, res) => {


    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { name, budget } = req.body;

    try {
        //Check category exist or not
        const exist = await Category.findOne({ name: name, user: req.user.id });
        if (exist) {
            return res.status(400).json({ error: 'Category already exist' });
        }

        
        const createCategory = await Category.create({
            name,
            budget,
            user: req.user.id
        });

        
        const success = await createCategory.save();
        if (success) {
            return res.status(200).json({ success });
        }
    }
    catch (error) {
        console.log(err);
        res.status(500).send('Error occured');
    }
});


router.post('/addExpense', fetchuser,[
    body('amount').isNumeric({ min: 1 }),
    body('info').isLength({ min: 1 }),       //Validate Expense
    //body('week').isNumeric({min:1,max:4})
], async (req, res) => {
    
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { amount, info, category, week } = req.body;
    try {
        //new expense
        let date = new Date();
        const month = new Date().getMonth();
        let adjustedDate = date.getDate()+date.getDay();
        let prefixes = ['0', '1', '2', '3', '4', '5'];
        let week= parseInt(prefixes[0 | adjustedDate / 7])+1;
        console.log(week);
        const newExpense = await Expense.create({
            amount,
            info,
            category,
            user: req.user.id,
            month,
            week
        });

        //database
        const success = await newExpense.save();
        if (success) {
            return res.status(200).json({ success, newExpense });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error occured');
    }
});


module.exports = router;