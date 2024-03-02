const path = require("path");
const notes = require(path.resolve("src/data/notes-data"));
const ratings = require(path.resolve("src/data/ratings-data")); // Import the ratings data


function getAllRatings(req, res) {
    console.log("reaching controller fucnction")
    res.json({ data: ratings });
}

function getRatingById(req, res) {
    const ratingId = Number(req.params.ratingId);

    const foundRating = ratings.find((rating) => rating.id === ratingId);

    if (foundRating) {
        res.json({ data: foundRating });
    } else {
        res.status(404).json({ error: `Rating id not found: ${ratingId}` });
    }
}


module.exports = {
    getAllRatings,
    getRatingById,
}  