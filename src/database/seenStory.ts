import { db, firebase } from "../firebaseconfig/firebase";


export const seenStory = (stories: any, user_email: string, currentStoryIndex: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!stories[currentStoryIndex].seen_by_user.includes(user_email)){
                await db
                    .collection("users")
                    .doc(stories[0].user_email)
                    .collection("stories")
                    .doc(stories[currentStoryIndex].id)
                    .update({
                        seen_by_user: firebase.firestore.FieldValue.arrayUnion(user_email)
                    })
            }
        } catch (error) {
            reject(error)
        }
    })

}