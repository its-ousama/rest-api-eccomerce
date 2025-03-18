const express = require("express");
const app = express();
const port = 3000;

// Middleware to calculate an arithmetic value and pass it to the request object
app.use((req, res, next) => {
    req.calculatedValue = 4 * 7; // example
    console.log(`Calculated Value: ${req.calculatedValue}`);
    next();
});

// Middleware to log the response before sending it to the user
app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        console.log("Response to user:", body);
        originalSend.call(this, body);
    };
    next();
});

app.get("/", (req, res) => {
    res.send(`Hello World! The calculated value is ${req.calculatedValue}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

