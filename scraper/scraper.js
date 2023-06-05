const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  get: async function get(req, res) {
    const from = req.params.from || "Tambaram";
    const to = req.params.to || "Chennai_Beach";
    const time = req.params.time || "Weekday";

    const URL = `https://www.metrotraintimings.in/Chennai/${from}-to-${to}-${time}-Local-suburban-MRTS-Train-Timings.htm`;
    let html;
    let rows;
    let table = [];
    try {
      //get html response
      await axios(URL).then((response) => {
        html = response.data;
      });

      //parse the html response
      const $ = cheerio.load(html);
      let buff = 0;
      let temp = [];
      let tb = $(
        "#contentcolumn > div > table:nth-child(3) > tbody > tr > td"
      ).each((idx, ele) => {
        if (idx > 7) {
          let x = $(ele).text();
          if (buff >= 7) {
            table.push(temp);
            console.log(temp);
            temp = [];
            buff = 0;
          }
          temp.push(x);
          buff++;
        }
      });
    } catch (error) {
      console.log(error, error.message);
    }

    res.send(table);
  },
};
