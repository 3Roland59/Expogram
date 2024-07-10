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

export const fetchFollowers = (user: user): Promise<object[] | string | any> => {
    return new Promise((resolve, reject):void =>{
        try {
            if(user.followers.length <= 0){
                resolve([])
            }
            else{
               db 
                .collection('user')
                .where(firebase.firestore.FieldPath.documentId(), 'in', user.followers)
                .onSnapshot((snapshot): void => {
                  const followers = snapshot.docs.map((doc) =>{
                      return ({ ...doc.data() })
                  })
                  resolve(followers)
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const fetchfollowing = (user: user): Promise<object[] | string | any> =>{
    return new Promise( (resolve, reject): void =>{
        try {
            if(user.following.length <= 0){
                resolve([])
            }
            else{
                db
                  .collection('user')
                  .where(firebase.firestore.FieldPath.documentId(), 'in', user.following)
                  .onSnapshot((snapshot): void =>{
                    const following = snapshot.docs.map((doc)  =>{
                        return ({ ...doc.data() })
                    })
                    resolve(following)
                }) 
            }
        } catch (error) {
            reject(error)
        }
    })

}