const express = require("express");
const profileController = require("../controllers/ProfileController");
const router = express.Router();

router.get("/api/profiles", profileController.getAllProfiles);
router.get("/api/profiles/:profileId", profileController.getProfileById);
router.post("/api/profiles", profileController.createProfile);
router.put("/api/profiles/:profileId", profileController.editProfile);
router.delete("/api/profiles/:profileId", profileController.deleteProfile);

module.exports = router;
