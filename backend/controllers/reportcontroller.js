const Income = require("../models/Income");
const Expense = require("../models/Expense");

// =====================================
// Generate Monthly Report
// =====================================
const generateMonthlyReport = async (req,res)=>{

    try{

        const month = Number(req.params.month);
        const year = Number(req.params.year);

        const incomes = await Income.find({
            user:req.user.id
        });

        const expenses = await Expense.find({
            user:req.user.id
        });

        const monthlyIncome = incomes.filter(item=>{

            const date = new Date(item.date);

            return (
                date.getMonth()+1===month &&
                date.getFullYear()===year
            );

        });

        const monthlyExpense = expenses.filter(item=>{

            const date = new Date(item.date);

            return (
                date.getMonth()+1===month &&
                date.getFullYear()===year
            );

        });

        const totalIncome = monthlyIncome.reduce(

            (sum,item)=>sum+item.amount,

            0

        );

        const totalExpense = monthlyExpense.reduce(

            (sum,item)=>sum+item.amount,

            0

        );

        const totalSavings = totalIncome-totalExpense;

        const categoryTotals={};

        monthlyExpense.forEach(expense=>{

            categoryTotals[expense.category]=

            (categoryTotals[expense.category]||0)

            +expense.amount;

        });

        let topCategory="None";

        let maxAmount=0;

        Object.keys(categoryTotals).forEach(category=>{

            if(categoryTotals[category]>maxAmount){

                maxAmount=categoryTotals[category];

                topCategory=category;

            }

        });

        res.json({

            month,

            year,

            totalIncome,

            totalExpense,

            totalSavings,

            topCategory

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

// =====================================
// Overall Financial Summary
// =====================================
const getFinancialSummary = async(req,res)=>{

    try{

        const incomes = await Income.find({
            user:req.user.id
        });

        const expenses = await Expense.find({
            user:req.user.id
        });

        const totalIncome = incomes.reduce(

            (sum,item)=>sum+item.amount,

            0

        );

        const totalExpense = expenses.reduce(

            (sum,item)=>sum+item.amount,

            0

        );

        res.json({

            totalIncome,

            totalExpense,

            balance:totalIncome-totalExpense,

            totalTransactions:

                incomes.length+expenses.length

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports={

    generateMonthlyReport,

    getFinancialSummary

};