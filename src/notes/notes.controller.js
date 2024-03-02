const path = require("path");
const notes = require(path.resolve("src/data/notes-data"));
const ratings = require(path.resolve("src/data/ratings-data")); // Import the ratings data




// function getAllRatings(req, res) {
//   console.log("reaching controller fucnction")
//   res.json({ data: ratings });
// }

// function getRatingById(req, res) {
//   const ratingId = Number(req.params.ratingId);

//   const foundRating = ratings.find((rating) => rating.id === ratingId);

//   if (foundRating) {
//     res.json({ data: foundRating });
//   } else {
//     res.status(404).json({ error: `Rating id not found: ${ratingId}` });
//   }
// }




function create(req, res) {
  const { data: { text } = {} } = req.body;
  const newNote = {
    id: notes.length + 1,
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
}

function destroy(req, res) {
  const { noteId } = req.params;
  const index = notes.findIndex((note) => note.id === Number(noteId));
  if (index > -1) {
    notes.splice(index, 1);
  }
  res.sendStatus(204);
}

function hasText(req, res, next) {
  const { data: { text } = {} } = req.body;

  if (text) {
    return next();
  }
  next({ status: 400, message: "A 'text' property is required." });
}

function list(req, res) {
  res.json({ data: notes });
}

function noteExists(req, res, next) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    return next();
  }
  next({
    status: 404,
    message: `Note id not found: ${req.params.noteId}`,
  });
}

function read(req, res) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => (note.id = noteId));
  res.json({ data: foundNote });
}

function update(req, res) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);

  const { data: { text } = {} } = req.body;

  foundNote.text = text;

  res.json({ data: foundNote });
}

function getNoteRatings(req, res) {
  const noteId = Number(req.params.noteId);

  // Filter ratings based on the noteId
  const foundRatings = ratings.filter((rating) => rating.noteId === noteId);

  if (foundRatings.length > 0) {
    res.json({ data: foundRatings });
  } else {
    // Return an empty array instead of 404 if no ratings are found
    res.json({ data: [] });
  }
}

function getNoteRatingById(req, res) {
  const noteId = Number(req.params.noteId);
  const ratingId = Number(req.params.ratingId);

  const foundNote = notes.find((note) => note.id === noteId);

  if (foundNote) {
    const foundRating = ratings.find(
      (rating) => rating.noteId === noteId && rating.id === ratingId
    );

    if (foundRating) {
      res.json({ data: foundRating });
    } else {
      res.status(404).json({ error: `Rating id not associated with note id: ${ratingId}` });
    }
  } else {
    res.status(404).json({ error: `Note id not found: ${noteId}` });
  }
}

module.exports = {
  create: [hasText, create],
  list,
  read: [noteExists, read],
  update: [noteExists, hasText, update],
  delete: [destroy],
  getNoteRatings,
  getNoteRatingById,
};