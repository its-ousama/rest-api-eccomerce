const express = require("express");
const userRoutes = require("./routes/users");
const connectDB = require("./utils/db");
const app = express();
const port = 3000;


app.use(express.json())


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    next()
   })

connectDB()


// ROUTES
app.use("/api/users", userRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to my API ! e-commerce backed 🤳")
   })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

