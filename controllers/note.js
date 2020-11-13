const db = require('../config/database');

const createTimestamp = () => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};

const getNote = () => (req, res) => {
  const lastcall = createTimestamp();
  const sign = req.params.id ? '=' : '>';
  const id = req.params.id || 0;
  db('notes').where('id', sign, id).select('*')
    .then(data => {
      if (data.length) {
        note = data[Math.floor(Math.random() * data.length)];
        db('notes').where('id', '=', note.id).increment('callcount', 1).catch(console.log);
        db('notes').where('id', '=', note.id).update({ lastcall }).catch(console.log);
        res.json(note);
      }
      else { res.sendStatus(204) }
    }).catch(err => res.status(400).json('Unable to read notes.'));
};

const postNote = () => (req, res) => {
  const { title, content } = req.body;
  const lastcall = createTimestamp();
  db('notes').insert({ title, content, lastcall }, ['id'])
    .then(output => {
      const { id } = output[0];
      res.json(id);
    })
    .catch(err => res.status(400).json("Failed to append note."));
};

const putNote = () => (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const lastcall = createTimestamp();
  db('notes').where('id', '=', id).update({ title, content, lastcall })
    .then(output => res.json(id))
    .catch(err => res.status(400).json("Failed to update note."));
}

const deleteNote = () => (req, res) => {
  const { id } = req.params;
  db('notes').where({ id }).del()
    .then(res.json("Note deleted successfully."))
    .catch(err => res.status(400).json("Failed to delete note."));
};

module.exports = { getNote, postNote, putNote, deleteNote };
