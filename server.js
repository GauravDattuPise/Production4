const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan");
const dotenv = require("dotenv")
dotenv.config();


const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.DB_URL)
.then(()=> console.log("DB is connected"))
.catch((err)=> console.log("error in connection", err));

app.use("/user", require("./src/routes/userRoutes"));
app.use("/task", require("./src/routes/taskRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  )
});

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on", 5000);
})

// console.log(process.env.DB_URL)
// console.log(process.env.PORT)
