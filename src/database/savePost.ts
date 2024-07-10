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

export const savePost = (post: post, currentUser: user) : Promise<boolean| string | any> =>{
    return new Promise(async (resolve, reject) =>{
        try {
            if(currentUser.saved_posts.includes(post.id)){

                await db
                    .collection('users')
                    .doc(currentUser.email)
                    .update({
                        saved_posts: firebase.firestore.FieldValue.arrayRemove(post.id)
                    })
            }else{

                await db
                    .collection('users')
                    .doc(currentUser.email)
                    .update({
                        saved_posts: firebase.firestore.FieldValue.arrayUnion(post.id)
                    })
            }
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}
