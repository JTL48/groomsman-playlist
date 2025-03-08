
use('groomsmenPlaylistDBTest');

db.getCollection('memories').insertOne({
  trackId: "spotifyTrackId1",
  memories: [
    { userID: "user1", text: "A fun night at the concert!" },
    { userID: "user2", text: "I remember this night too!" }
  ]
});

// Run a find command to view items sold on April 4th, 2014.
const memories = db.getCollection('memories').find({ trackId: "spotifyTrackId1" });

// Print a message to the output window.
console.log(memories);
