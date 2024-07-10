import { db,firebase } from "../firebaseconfig/firebase";

export const storeUserDetails = (uid: string, email: string, username: string, country: string, profile_picture: string, bio: string, link: string): Promise<boolean | string> => {
    return new Promise(async (resolve, reject): Promise<void> => {
        try {
            await db.collection("users")
            .doc(email)
            .set({
                user_id: uid,
                email: email,
                username: username,
                profile_picture:profile_picture,
                bio: bio,
                link: link,
                gender: ["prefer not say", ""],
                followers: [],
                following: [],
                followersRequset: [],
                followingRequest: [],
                events_notification: [],
                chat_notification: [],
                saved_posts: [],
                close_friends: [],
                favorite_users: [],
                muted_users: [],
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                country: country
            });
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}



