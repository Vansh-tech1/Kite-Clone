require("dotenv").config();

const express = require("express");
const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionModel");
const { OrdersModel } = require("./models/OrdersModel");
const mongoose = require("mongoose");
const authRoute = require("./routes/AuthRoute");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require("cors");

const PORT = process.env.PORT || 3001;
const uri = process.env.MONGO_URL;
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

// app.get("/addPositions",(req,res)=>{
//   let tempPositions=[
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ]
//   for(position of tempPositions){
//     let newPosition=new PositionsModel({
//       product: position.product,
//       name:  position.name,
//       qty: position.qty,
//       avg:  position.avg,
//       price:  position.price,
//       net:  position.net,
//       day:  position.day,
//       isLoss:  position.isLoss,
//     })
//     newPosition.save();
//   }
//   res.send("done !!!");

// });

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post("/newOrder", async (req, res) => {
  console.log("new order initialized");
  let newOrder = await new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
  console.log(newOrder.id);
});

app.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const deletedOrder = await OrdersModel.findOneAndDelete({
      name: req.params.id,
    });
    console.log(deletedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
});

mongoose
  .connect(uri)
  .then(console.log("connected to db"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log("app is started");
});
