import { db, doc, firebase } from '../firebaseconfig/firebase'
import { addUser } from './addUser'

type currentUser ={
    user_id: string,
    email: string,  
    username: string,
    name: string,
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

type user = {
    email: string,
    username: string,
    name: string,
    profile_picture: string,
    status: string
}

export const sendMessage = (user: user, currentUser: currentUser,textMessage: string) =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {
            if(user.status === undefined){
                await addUser(user, currentUser.email)
            }

            const notification = {
                chat_notification: firebase.firestore.FieldValue.increment(1)
            }

            const current = {
                email: currentUser.email,
                name: currentUser.name,
                username: currentUser.username,
                profile_picture: currentUser.profile_picture,
                status: 'unseen'
            }

            const newCurrentMessage = {
                message: textMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                who: 'current',
            }

            const newUserMessage = {
                message: textMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                who: 'user',
            }

            const batch = db.batch()

            const userRef = db
                .collection('users')
                .doc(user.email)

            const currentChatRef = db
                .collection('users')
                .doc(currentUser.email)
                .collection('chat')
                .doc(user.email)

            const newUserChatRef = db
                .collection('users')
                .doc(user.email)
                .collection('chat')
                .doc(currentUser.email)

            batch.set(userRef, notification, { merge: true })
            batch.set(newUserChatRef, current, { merge: true })
            batch.set(
                currentChatRef.collection('messages').doc(),
                newCurrentMessage
            )
            batch.set(
                newUserChatRef.collection('messages').doc(),
                newUserMessage
            )

            batch.commit()
        } catch (error) {
            reject(error)
        }
    })
}