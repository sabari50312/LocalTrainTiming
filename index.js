const express = require("express");
const timings = require("./routes/timings");
const port = 3000;

const app = express();
// app.use(express.json());

app.use("/", timings);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/ . . . `);
});
