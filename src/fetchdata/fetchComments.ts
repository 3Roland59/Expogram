import { db, firebase } from "../firebaseconfig/firebase";

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

export const fetchAllComments = (post:post, limits: number) =>{
    return new Promise(async (resolve,reject) =>{
        try {
            
        } catch (error) {
            reject(error)
        }
    })
}