const router = require("express").Router();
const controller = require("./notes.controller");

router
  .route("/:noteId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(send405Error);

router.route("/").get(controller.list).post(controller.create).all(send405Error);

// Ratings routes
router.route("/:noteId/ratings").get(controller.getNoteRatings);
router.route("/:noteId/ratings/:ratingId").get(controller.getNoteRatingById);

// // Overall ratings routes
// router.route("/ratings").get(controller.getAllRatings);
// router.route("/ratings/:ratingId").get(controller.getRatingById);

// Helper function for sending 405 error
function send405Error(req, res) {
  res.status(405).json({ error: "Method not allowed." });
}

module.exports = router;