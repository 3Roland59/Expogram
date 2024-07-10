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

export const handleAcceptRequest = (currentUser: user, user: user, accept: boolean): Promise<boolean | string> => {
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {
            await db
               .collection('users')
               .doc(user.email)
               .update({
                   followingRequest:firebase.firestore.FieldValue.arrayRemove(currentUser.email),
                   ...(accept && {
                        following: firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                   })
            })

            await db
               .collection('users')
               .doc(currentUser.email)
               .update({
                  followersRequest: firebase.firestore.FieldValue.arrayRemove(user.email),
                  ...(accept && {
                       followers: firebase.firestore.FieldValue.arrayUnion(user.email)
                  })
            })

            if(accept){
                await db
                   .collection('users')
                   .doc(user.email)
                   .update({
                       events_notification: firebase.firestore.FieldValue.increment(1)
                   })
            }
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}