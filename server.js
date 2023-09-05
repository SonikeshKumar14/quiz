const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', process.env.FRONT_LINK);
  next();
});
app.use(require("./routes/quizzes"));
app.use(require("./routes/ranking"));

const dbo = require("./db/conn");
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, ()=> {
    dbo.connectToServer(function(err){
        if (err) console.error(err);
    });
    console.log(`Server is running on ${port}`);
})
