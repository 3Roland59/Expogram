import { rejects } from 'assert'
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


export const deletePost = (post: post, user_email: string ): Promise<string> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {

            await db
              .collection('users')
              .doc(user_email)
              .collection('Post')
              .doc(post.id)
              .delete()

            resolve('Post Deleted')

        } catch (error) {
            reject(error as string)
        }
    })
}

type story = {
    id: string,
    imageUrl: string,
    username: string,
    name: string,
    profile_picture: string,
    user_id: string,
    user_email: string,
    created_at: string,
    likes_by_users: string[],
    new_likes: string[],
    seen_by_user: string[]
}

export const deleteStrory = (story: story): Promise<string> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {

            await db
              .collection('users')
              .doc(story.user_email)
              .collection('stories')
              .doc(story.id)
              .delete()

            resolve('Story Deleted')

        } catch (error) {
            reject(error as string)
        }
    })
}

type reel = {
    id: string,
    username: string,
    user_id: string,    
    email: string,
    profile_picture: string,
    videoUrl: string,
    caption: string,
    created_at: string,
    likes_by_users: string[],
    new_likes: string[],
    comments: string[]
}

export const deleteReel = (reel : reel): Promise<boolean|string> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {

            await db
                .collection('users')
                .doc(reel.email)
                .collection('reels')
                .doc(reel.id)
                .delete()
            resolve(true)
        } catch (error) {
            reject(error as string)
        }
    })
}

export const deleteReelComment = (reel: reel, tagetedIndex: number, allComments: any, email: string): Promise<boolean|string> =>{
    return new Promise(async (resolve, reject ): Promise<void> =>{
        try {
            
            let updatedValues = allComments

            updatedValues.splice(tagetedIndex, 1)

            await db
              .collection('users')
              .doc(reel.email)
              .collection('reels')
              .doc(reel.id)
              .update(
                {
                    comments: updatedValues,
                }
            )
            resolve(true)
        } catch (error) {
            reject(error as string)
        }
    })
}
export const deleteComment = (tagetedIndex: number,allComments: any, postId: string, email: string):  Promise<boolean | string> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {

            let updatedValues = allComments

            updatedValues.splice(tagetedIndex, 1)

            await db
              .collection('users')
              .doc(email)
              .collection('Post')
              .doc(postId)
              .update(
                {
                    comments: updatedValues,
                }
            )
            resolve(true)
        } catch (error) {
            reject(error as string)
        }
    })
}

