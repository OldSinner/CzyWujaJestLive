const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();
const port = 3000;
const { ApiClient } = require("twitch");
const { ClientCredentialsAuthProvider } = require("twitch-auth");
var cors = require("cors");
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });
app.use(cors());
app.get("/", async (req, res) => {
  var data = {
    status: 0,
    text: "",
    link: "",
  };
  await axios
    .get("https://www.youtube.com/@dominikbos/live")
    .then(async ({ data }) => {
      const $ = cheerio.load(data);
      var title = $("title").text();
      if (title == "Dominik Bos - YouTube") {
        await apiClient.helix.streams
          .getStreamByUserName("awizotv")
          .then((stream) => {
            if (stream) {
              res.send({
                status: 3,
                text: "Awizo streamuje!",
                link: "https://www.twitch.tv/awizotv",
              });
            } else {
              res.send({
                status: 1,
                text: "Stary nie streamuje, ale zawsze możesz obejrzeć shoty na kanale AwizoTV",
                link: "https://www.youtube.com/@AwizoTV",
              });
            }
          });
      } else {
        res.send({
          status: 2,
          text: title,
          link: "https://www.youtube.com/@dominikbos/live",
        });
      }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
