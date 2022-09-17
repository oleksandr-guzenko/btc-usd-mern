const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');

const users = require("./routes/api/users");
const guess = require("./routes/api/guess");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true 
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

io.on('connection', client => {
  setInterval(() => {
    axios
      .get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
      .then(res => {
        io.emit('updateBTC_USD', res.data.data.amount);
      })
      .catch(err => console.log(err));
  }, 1000);
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/guess", guess);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server up and running on port ${port} !`));
