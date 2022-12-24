import Attempt from "../models/attempt.js";

export const attemptGetAttempts = async (req, res) => {
  try {
    const allAttempts = await Attempt.find();

    res.status(200).json({ attempts: allAttempts });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const attemptGetAttempt = async (req, res) => {
  const aId = req.params.attemptId;

  try {
    const attempt = await Attempt.findById(aId);

    if (!attempt)
      return res.status(404).json({ message: "Attempt doesn't exist." });

    res.status(200).json({ attempt });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const attemptDeleteAttempt = async (req, res) => {
  const { aId } = req.body;

  try {
    const deletedAttempt = await Attempt.findByIdAndDelete(aId);

    if (!deletedAttempt)
      return res
        .status(404)
        .json({ message: "Failed to delete attempt " + aId });

    res.status(200).json({ deletedAttempt });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const attemptCreateAttempt = async (req, res) => {
  const attempt = req.body;

  try {
    const newAttempt = await Attempt.create({
      ...attempt,
      createdAt: new Date().toISOString(),
    });

    await newAttempt.save();

    res.status(200).json({ attempt: newAttempt });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};
