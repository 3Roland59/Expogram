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

export const uploadComment = (post: post, currentUserEmail: string, currentUserUsername: string, currentUserProfile: string,content: string): Promise<boolean| string | any> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {
            const snapshot = await db
            .collection("users")
            .doc(post.email)
            .collection("Post")
            .doc(post.id)
            .get()

            if(snapshot.exists){
                const postRef = snapshot.ref
                const newComment = {
                    email: currentUserEmail,
                    profile_picture: currentUserProfile,
                    username: currentUserUsername,
                    comment: content,
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    likes_by_users: "",
                }

                await postRef.update({
                    comments: firebase.firestore.FieldValue.arrayUnion(newComment)
                })

                if(post.email !== currentUserEmail)(
                    await db
                        .collection("users")
                        .doc(post.email)
                        .update({
                            event_notification: firebase.firestore.FieldValue.increment(1)
                    })
                )
                resolve(true)
            }else{
                reject("Post not found")
            }
        } catch (error) {
            reject(error)
        }
    })
}