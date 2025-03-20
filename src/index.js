const express = require("express");
const userRoutes = require("./routes/users")
const app = express();
const port = 3000;

app.use(express.json())


// Middleware to log the response before sending it to the user
app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        console.log("Response to user:", body);
        originalSend.call(this, body);
    };
    next();
});


// ROUTES
app.use("/api/users", userRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to my API ! e-commerce backed 🤳")
   })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

