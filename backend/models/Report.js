const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    month:{
        type:Number,
        required:true
    },

    year:{
        type:Number,
        required:true
    },

    totalIncome:{
        type:Number,
        default:0
    },

    totalExpense:{
        type:Number,
        default:0
    },

    totalSavings:{
        type:Number,
        default:0
    },

    topCategory:{
        type:String,
        default:"None"
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Report",reportSchema);