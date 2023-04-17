const express = require("express");
const cors = require("cors");
const products = require("./controllers/product.controllers.js");
const db  = require("./models/index")
const app = express();
var corsOptions = {
    origin: "http://localhost:3000"

}
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// app.get("/", (req, res) => {
//     res.json({ message: "connected" })
// });
app.get('/', products.findAll);
app.post("/",cors(corsOptions), products.create);
app.delete("/",products.deleteAll)
const PORT = process.env.PORT || 4000;
app.listen(PORT ,async ()=>{
    console.log(`server conncetd to port ${PORT}`);
    console.log("Conecting to DB.....");
    await db.mongoose
    .connect(db.url, {
    })

      console.log("Connected to the database!");

    //   console.log("Cannot connect to the database!", err);

})