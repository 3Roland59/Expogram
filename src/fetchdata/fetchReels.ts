import { db, firebase } from '../firebaseconfig/firebase'

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

export const fetchReels = () =>{
    return new Promise( (resolve, reject): void =>{
        try {
            db
              .collectionGroup('reels')
              .onSnapshot((snapshot) =>{
                const videos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                resolve(videos as reel[])
            })
        } catch (error) {
            reject(error)
        }
    })
}