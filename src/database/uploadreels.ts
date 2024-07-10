import { db, firebase } from '../firebaseconfig/firebase'

export const uploadReel = (username: string,user_id: string,email: string, profile_picture: string,videoUrl: string,caption: string,  ): Promise<boolean | string> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {
            
            const reel = {
                username: username,
                user_id: user_id,
                email: email,
                profile_picture: profile_picture,
                videoUrl: videoUrl,
                caption: caption,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                new_likes: [],
                comments: []
            }
            await db
                .collection('users')
                .doc(email)
                .collection('reels')
                .add(reel)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}