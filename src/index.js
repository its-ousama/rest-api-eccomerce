const express = require("express");
const userRoutes = require("./routes/users");
const connectDB = require("./utils/db");
const productRoutes = require("./routes/products")
const invoiceRoutes = require("./routes/invoices")

const app = express();
const port = 3000;
const path = require("path")


app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


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
app.use("/api/products", productRoutes)
app.use("/api/invoices", invoiceRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to my API ! e-commerce backed 🤳")
   })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});