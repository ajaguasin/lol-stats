const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const app = express();
const riotAPI = require("./api/riotAPI");

if (process.env.NODE_ENV === "production") {
  const root = path.resolve(__dirname, "../public");
  app.use(express.static(root));
  app.use(fallback("index.html", { root }));
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/summoner", riotAPI);

app.listen(port, () => {
  console.log("App is listening on port ", port);
});
