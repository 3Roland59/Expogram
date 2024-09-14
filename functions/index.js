/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Schedule function to run every day
exports.deleteOldStories = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
  const db = admin.firestore();
  const usersRef = db.collection("users");
  const now = admin.firestore.Timestamp.now();
  const cutoff = now.toMillis() - 24 * 60 * 60 * 1000; // 24 hours ago

  try {
    const usersSnapshot = await usersRef.get();
    const batch = db.batch();

    for (const userDoc of usersSnapshot.docs) {
      const storiesRef = userDoc.ref.collection("stories");
      const storiesSnapshot = await storiesRef.get();

      storiesSnapshot.forEach((storyDoc) => {
        const storyData = storyDoc.data();
        const createdAt = storyData.created_at;

        if (createdAt && createdAt.toMillis() <= cutoff) {
          batch.delete(storyDoc.ref);
        }
      });
    }

    await batch.commit();
    console.log("Old stories deleted successfully");
  } catch (error) {
    console.error("Error deleting old stories: ", error);
  }
});



