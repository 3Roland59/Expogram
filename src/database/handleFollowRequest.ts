import { db, firebase } from '../firebaseconfig/firebase'

type user ={
    user_id: string,
    email: string,  
    username: string,
    profile_picture: string,
    bio: string,
    link: string
    gender: string[],
    followers: string[],
    following: string[],
    followersRequset: string[],
    followingRequest: string[],
    events_notification: string[],
    chat_notification: string[],
    saved_posts: string[],
    close_friends: string[],
    favorite_users: string[],
    muted_users: string[],
    created_at: string,
    country: string
}
export const handleFollowRequest = (currentUser: user, userEmail:string): Promise<boolean | string> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {
            const batch = db.batch()
            await db
                .collection('users')
                .doc(userEmail)
                .update({
                    followersRequset: !currentUser.followingRequest.includes(userEmail)
                        ? firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                        : firebase.firestore.FieldValue.arrayRemove(currentUser.email)
                })

            await db
                .collection('users')
                .doc(currentUser.email)
                .update({
                    followingRequest: !currentUser.followingRequest.includes(userEmail)
                        ? firebase.firestore.FieldValue.arrayUnion(userEmail)
                        : firebase.firestore.FieldValue.arrayRemove(userEmail)
                })
            await batch.commit()
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}