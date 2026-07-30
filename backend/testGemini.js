require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);


async function test(){

try{

const model = genAI.getGenerativeModel({
    model:"gemini-2.5-flash"
});


const result = await model.generateContent(
    "Explain saving money in 2 lines"
);


console.log(result.response.text());


}catch(error){

console.log(error.message);

}

}


test(); 