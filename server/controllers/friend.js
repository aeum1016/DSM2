import User from "../models/user.js";

export const friendGetFriends = async (req, res) => {
  const { uId } = req.body;

  try {
    const existingUser = await User.findById(uId);

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    res.status(200).json({ friends: existingUser.friends });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const friendGetRequests = async (req, res) => {
  const { uId } = req.body;

  try {
    const existingUser = await User.findById(uId);

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    res.status(200).json({ friendRequests: existingUser.requests });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const friendAddFriend = async (req, res) => {
  const { uId, fId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(uId, {
      $addToSet: { friends: [fId] },
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User doesn't exist." });

    res.status(200).json({ friends: updatedUser.friends });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const friendAddRequest = async (req, res) => {
  const { uId, fId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(uId, {
      $addToSet: { requests: [fId] },
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User doesn't exist." });

    res.status(200).json({ friendRequests: updatedUser.requests });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const friendRemoveFriend = async (req, res) => {
  const { uId, fId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(uId, {
      $pullAll: { friends: [fId] },
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User doesn't exist." });

    res.status(200).json({ friends: updatedUser.friends });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const friendRemoveRequest = async (req, res) => {
  const { uId, fId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(uId, {
      $pullAll: { requests: [fId] },
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User doesn't exist." });

    res.status(200).json({ friendRequests: updatedUser.requests });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
