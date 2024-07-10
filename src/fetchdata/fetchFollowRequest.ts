import { db, firebase } from '../firebaseconfig/firebase'

type user ={
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

export const fecthRequest = (user: user ): Promise<object[] | string> => {
    return new Promise((resolve, reject): void => {
        try {
            if(user.followersRequset.length <= 0){
                resolve([])
            }
            else{
                db
                  .collection('users')
                  .where(firebase.firestore.FieldPath.documentId(), 'in', user.followersRequset)
                  .onSnapshot((snapshot): void =>{
                    const followersRequset = snapshot.docs.map((doc) =>{
                        return ({ ...doc.data()})
                    })
                    resolve(followersRequset)
                })
            }
        } catch (error) {
            reject(error as string)
        }
    })
}