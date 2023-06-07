const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  get: async function get(req, res) {
    const from = req.params.from || "Tambaram";
    const to = req.params.to || "Chennai_Beach";
    const time = req.params.time || "Weekday";

    const URL = `https://www.metrotraintimings.in/Chennai/${from}-to-${to}-${time}-Local-suburban-MRTS-Train-Timings.htm`;
    let html;
    let table = {};
    try {
      //get html response
      await axios(URL).then((response) => {
        html = response.data;
      });

      //parse the html response
      const $ = cheerio.load(html);
      //declare buffer and temp
      let buff = 0;
      let temp = [];
      //Check for no available routes
      let error = $("#contentcolumn > div > div > p:nth-child(7)");
      if (error.text() == "No direct trains found between Stations ") {
        return res
          .status(200)
          .json({ error: "No direct trains found between Station" });
      }
      //If successful convert to JSON
      else {
        $("#contentcolumn > div > table:nth-child(3) > tbody > tr > td").each(
          (idx, ele) => {
            if (idx > 7) {
              let x = $(ele).text();
              if (buff >= 7) {
                table[temp[0]] = temp.slice(1, 7);
                // console.log(temp);
                temp = [];
                buff = 0;
              }
              temp.push(x);
              buff++;
            }
          }
        );
        res.status(200).send(JSON.stringify(table));
      }
      // console.log(JSON.stringify(table));
    } catch (error) {
      console.log(error, error.message);
    }
  },
};
