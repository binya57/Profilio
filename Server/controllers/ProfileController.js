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
        .send({ status: "Failed", msg: "This User Alreadey Has A Profile" });
    const profileResponse = await newProfile.save();
    //! this does not updates for some reason!!!
    const userResponse = await User.updateOne(
      { userId },
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
      select: "title author body",
    });
    if (!requestedProfile) return res.status(404).send();
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
  const { profileId } = req.body;
  try {
    await Profile.updateOne({ profileId }, req.body);
    return res.status(204).json();
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
