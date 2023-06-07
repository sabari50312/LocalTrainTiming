const express = require("express");
const router = express.Router();
const scraper = require("../scraper/scraper.js");

router.get("/:from/:to/:time", scraper.get);
router.get("/", (req, res) => {
  res.send(
    "Enter link as /{from}/{to}/{time} ('weekdays' / 'sunday') Eg:   http://localhost:3000/Potheri/Tambaram/Sunday"
  );
});
module.exports = router;
