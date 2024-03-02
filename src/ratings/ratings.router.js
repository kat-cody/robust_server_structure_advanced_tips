const router = require("express").Router();
const controller = require("./ratings.controller");


// Helper function for sending 405 error
function send405Error(req, res) {
    res.status(405).json({ error: "Method not allowed." });
}


// Overall ratings routes
router.route("/").get(controller.getAllRatings).all(send405Error);
router.route("/:ratingId").get(controller.getRatingById).all(send405Error);

module.exports = router;