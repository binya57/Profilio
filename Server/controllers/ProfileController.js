const Profile = require("../models/Profile");
const User = require("../models/User");

const createProfile = async (req, res) => {
  const { userId } = req.body;

  const newProfile = new Profile(req.body);
  try {
    const hasProfile = await Profile.findOne({ userId });
    if (hasProfile)
      return res
        .status(400)
        .send({ status: "Failed", message: "This User Already Has A Profile" });
    const profileResponse = await newProfile.save();
    const userResponse = await User.updateOne(
      { _id: userId },
      { userProfileId: profileResponse.id }
    );
    return res.status(201).send(profileResponse);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    return res.json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

const getProfileById = async (req, res) => {
  const { profileId } = req.params;
  try {
    const requestedProfile = await Profile.findById(profileId).populate({
      path: "posts",
      select: "title author body updatedAt",
    });
    if (!requestedProfile)
      return res
        .status(404)
        .send({ status: "Failed", message: "No Matching Profile Found" });
    return res.json(requestedProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};

const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const requestedProfile = await Profile.findOne({ userId });
    return res.json(requestedProfile || {});
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

const editProfile = async (req, res) => {
  const { profileId } = req.params;
  try {
    await Profile.updateOne({ profileId }, req.body);
    return res
      .status(200)
      .json({ status: "Sucsess", message: "Profile Updated Sucsessfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
};
const deleteProfile = async (req, res) => {};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  getUserProfile,
  editProfile,
  deleteProfile,
};
