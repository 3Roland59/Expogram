import {
  db,
  firebase,
} from "../firebaseconfig/firebase";

export const uploadStory = (imageUrl: string,username: string,name: string,profile_picture: string,user_id: string,user_email: string,): Promise<boolean | string> => {
  return new Promise(async (resolve, reject) => {
    try {
        const newStory = {
            imageUrl: imageUrl,
            username: username,
            name: name,
            profile_picture: profile_picture,
            user_id: user_id,
            user_email: user_email,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users: [],
            new_likes: [],
            seen_by_user: []
        }
      await db
        .collection("users")
        .doc(user_email)
        .collection("stories")
        .add(newStory)
        resolve(true)
    } catch (error) {
        reject(error as string)
    }
  });
};

