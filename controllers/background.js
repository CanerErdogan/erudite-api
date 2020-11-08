const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;

const fetch = require('node-fetch');
global.fetch = fetch;

const { UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY } = require('../keys');

const unsplash = new Unsplash({
  accessKey: UNSPLASH_ACCESS_KEY,
  secret: UNSPLASH_SECRET_KEY
});

const getBgImage = (req, res) => {
  unsplash.photos.getRandomPhoto({
    orientation: "landscape",
    featured: true
  }).then(toJson).then(data => { res.json(data) })
    .catch(err => res.status(400).json("API fail: " + err));
};

module.exports = { getBgImage };
