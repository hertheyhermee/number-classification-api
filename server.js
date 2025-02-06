import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

app.get("/api/classify-number", async (req, res) => {
    let { number } = req.query;

    // Validate input
    if (!number || isNaN(number) || number.includes(".")) {
        return res.status(400).json({
            number,
            error: true
        });
    }

    number = parseInt(number);

    const isPrime = checkPrime(number);
    const isPerfect = checkPerfect(number);
    const isArmstrong = checkArmstrong(number);
    const parity = number % 2 === 0 ? "even" : "odd";
    const digitSum = number.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);

     // Randomly select one of ['math', 'trivia', 'date']
     const options = ["math", "trivia", "date"];
     const randomOption = options[Math.floor(Math.random() * options.length)];

    // Fetch fun fact from Numbers API
    let funFact = "";
    try {
        const response = await axios.get(`http://numbersapi.com/${number}/${randomOption}`, { timeout: 5000 });
        funFact = response.data;
    } catch (error) {
        console.error("Error fetching fun fact:", error.message);
        funFact = "Could not fetch fun fact.";
    }    

    // Determine properties
    const properties = isArmstrong ? ["armstrong", parity] : [parity];

    res.json({
        number,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties,
        digit_sum: digitSum,
        fun_fact: funFact
    });
});

// Check if a number is prime
function checkPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Check if a number is perfect
function checkPerfect(num) {
    let sum = 0;
    for (let i = 1; i < num; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num;
}

// Check if a number is an Armstrong number
function   checkArmstrong(num) {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})