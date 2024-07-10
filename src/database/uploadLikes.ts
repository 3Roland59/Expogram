import { db, firebase } from '../firebaseconfig/firebase'

type post = {
    id: string,
    username: string,
    user_id: string,
    email: string,
    profile_picture: string,
    imageUrl: string,
    caption: string,
    Hastag: string[],
    created_at: string,
    likes_by_users: string[],
    new_likes: string[],
    comments: string[]
}

export const handlepostlikes = (post: post, currentUserEmail: string,currentUserUsername: string, currentUserProfile:string): Promise<boolean |any> => {
    return new Promise(async (resolve,reject): Promise<void> => {
        const currentLikesStatus = !post.likes_by_users.includes(currentUserEmail)
        try {
            await db
              .collection("users")
              .doc(post.email)
              .collection("Post")
              .doc(post.id)
              .update({
                  likes_by_users: currentLikesStatus
                    ? firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
                    : firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
                  new_likes: currentLikesStatus
                    ? [currentUserUsername, currentUserProfile]
                    : []
            })

            await db
            .collection("users")
            .doc(post.email)
            .update({
                event_notification: currentLikesStatus
                    ? firebase.firestore.FieldValue.increment(1)
                    : firebase.firestore.FieldValue.increment(-1)
            })
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

type story = {
    id: string
    imageUrl: string,
    username: string,
    name: string,
    profile_picture: string,
    user_id: string,
    user_email: string,
    created_at: string | number,
    likes_by_users: string[],
    new_likes: string[],
    seen_by_user: string[]
}

export const handlestoryLikes = (story: story, currentUserEmail: string): Promise<boolean | any> => {
    return new Promise(async (resolve, reject):Promise<void> =>{
        const currentLikesStatus = !story.likes_by_users.includes(currentUserEmail)
        try {
            await db
              .collection("users")
              .doc(story.user_email)
              .collection("stories")
              .doc(story.id)
              .update({
                likes_by_users: currentLikesStatus
                    ? firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
                    : firebase.firestore.FieldValue.arrayRemove(currentUserEmail)
            })
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}
