require("dotenv").config();
const { SESSION_SECRET_KEY } = process.env;

const express = require("express");
const app = express();
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const fs = require("fs");

npx sequelize model:generate --name OrderCustomer --attributes order_customer_id:integer,state:integer

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 1000 * 60 * 60 }),
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

//back-end
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

fs.readdirSync("./routes").forEach((routes) => {
  app.use("/", require(`./routes/${routes}`));
});

app.listen(3000, (err) => {
  if (err) return console.error(err);
  console.log("Server listening on Port", 3000);
});
