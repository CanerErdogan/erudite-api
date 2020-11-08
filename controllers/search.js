const fetch = require('node-fetch');


const sendRequestToSearch = (req, res) => {
  const { site, query } = req.body;
  switch (site) {
    case "duckduckgo":
      res.json(`https://www.duckduckgo.com/?q=${query}`);
      break;
    case "google":
      res.json(`https://www.google.com/search?q=${query}`);
      break;
    default:
      res.status(400).json("Site key undefined");
      break;
  }
}

module.exports = { sendRequestToSearch };