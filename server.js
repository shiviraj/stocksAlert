const express = require("express")
const main = require("./app");
require("./src/db/connect")

const app = express()

app.get("/", async (req, res) => {
  await main()
  res.send({status: "OK"})
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log("server is listening on port", port))
