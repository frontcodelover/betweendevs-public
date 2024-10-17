const User = require('../models/user.js');
const Match = require('../models/match.js');
const speTechnoLookup = require('../utils/speTechnoLookup.js');

const matchController = {
  getAllMatches: async (req, res) => {
    const userId = req.user._id; // id connnected user
    try {
      // We get all the matches of the user
      const userMatches = await User.aggregate(speTechnoLookup).match({ _id: userId });

      if (!userMatches) {
        return res.status(404).json({ error: 'No match found' });
      }

      const matches = userMatches[0].match;

      const filteredMatch = await matches.filter((match) => (match.user1_id !== userId || match.user2_id !== userId) && match.accepted);

      const userMatchInfos = [];
      for (const match of filteredMatch) {
        const user = await User.findOne({ _id: match.user1_id !== userId ? match.user1_id : match.user2_id });
        userMatchInfos.push({ _id: user._id, pseudo: user.pseudo, picture: user.picture });
      }

      res.status(200).json(userMatchInfos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error while getting the matches' });
    }
  },

  createMatch: async (req, res) => {
    // connected user id
    const userId = req.user._id;
    // co
    const { matchUserId } = req.params; // id de l'utilisateur avec qui on veut matcher

    try {
      // We check if the user is trying to match with themselves
      if (userId === matchUserId) {
        return res.status(400).json({ error: 'You cannot match with yourself.' });
      }

      // We check if there is a pending match for the proposed user
      const matchPending = await matchController.checkPendingMatch(userId, matchUserId);
      // If there is a pending match we validate it
      if (matchPending) {
        await Match.findByIdAndUpdate(matchPending._id, { accepted: true });
        // We add the match to the proposed user
        await matchController.addMatchToUser(userId, matchPending._id);
        return res.status(201).json({ message: "It's a complete match, you can now start chatting!" });
      }

      // Else we create a new match
      const match = new Match({
        user1_id: userId,
        user2_id: matchUserId,
        created_at: new Date(),
        accepted: false,
      });
      await match.save();
      // We add the match to the user who requested it
      await matchController.addMatchToUser(userId, match._id);
      // We add the match in pending to the proposed user
      await matchController.addPendingMatchToOtherUser(matchUserId, userId, match._id);

      return res.status(200).json({ message: 'Match created successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error while creating the match.' });
    }
  },

  addMatchToUser: async (userId, matchId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (!Array.isArray(user.match)) {
        // Create match array  if not exist
        user.match = [];
      }
      // We add the matchId to the array
      user.match.push({ _id: matchId });

      await user.save();
    } catch (error) {
      console.error(error);
      throw new Error('Server error while updating the user');
    }
  },

  addPendingMatchToOtherUser: async (matchUserId, userId, matchId) => {
    try {
      const user = await User.findById(matchUserId);
      if (!user) {
        throw new Error('User not found');
      }

      if (!Array.isArray(user.pendingMatch)) {
        // Create pendingMatch Array if not exist
        user.pendingMatch = [];
      }
      // We add the userId and the matchId to the array
      user.pendingMatch.push({ _id: userId, matchId });
      await user.save();
    } catch (error) {
      console.error(error);
      throw new Error('Server error while updating the user');
    }
  },

  checkPendingMatch: async (userId, matchUserId) => {
    try {
      // We check if there is a pending match for the proposed user
      const user = await User.findById(userId);
      if (user.pendingMatch.length > 0) {
        // We search for the pendingMatch we are interested in and we get the index
        const pendingMatchIndex = user.pendingMatch.findIndex(
          // We compare the id of the user in the pending and the id of the user with whom we want to match
          (pending) => pending._id === matchUserId,
        );
        // If there is a pending match we update the match
        if (pendingMatchIndex !== -1) {
          // We get the matchId
          const pendingMatchId = user.pendingMatch[pendingMatchIndex].matchId;
          // We update the value of accepted to true
          await Match.findByIdAndUpdate(pendingMatchId, { accepted: true });
          // We remove the match from the pending array
          user.pendingMatch.splice(pendingMatchIndex, 1);
          // We save the user data
          await user.save();

          // We get the updated match and return it
          const updatedMatch = await Match.findById(pendingMatchId);

          return updatedMatch;
        }
      }

      // If no pending match, we return null
      return null;
    } catch (error) {
      console.error(error);
      throw new Error('Server error while checking for pending match.');
    }
  },

  blockMatch: async (req, res) => {
    const userId = req.user._id;
    const { matchId } = req.params;

    try {
      const acceptedMatch = await Match.findOne({ _id: matchId, accepted: true });

      if (!acceptedMatch) {
        return res.status(400).json({ error: 'You cannot block a match that is not accepted.' });
      }
      // We block the match
      await Match.findByIdAndUpdate(acceptedMatch._id, { blocked: true });
      const users = await User.find({ 'match._id': matchId });
      users.forEach(async (user) => {
        await User.updateOne({ _id: user._id }, { $pull: { match: { _id: matchId } } });
      });
      return res.status(200).json({ message: 'Match blocked successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error while blocking the match' });
    }
  },
};
module.exports = matchController;
