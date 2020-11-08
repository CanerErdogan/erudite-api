const express = require('express');
const cors = require('cors');

const search = require('./controllers/search');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/search', (req, res) => {
    console.log(req.body);
    search.sendRequestToSearch(req, res)
});

ERUDITE_API_PORT = process.env.ERUDITE_API_PORT || 3001;
app.listen(ERUDITE_API_PORT, () => console.log(`Listening on port ${ERUDITE_API_PORT}`));