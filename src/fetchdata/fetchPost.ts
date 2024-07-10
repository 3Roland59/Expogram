import { db, collection, getDocs, query, orderBy, limit } from "../firebaseconfig/firebase"

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

export const fetchAllPost = (limits: number): Promise<post[] | any> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {
            const usercollectionref = collection(db,"users")
            const allusersSnapshot = await getDocs(usercollectionref)
            let allPost: post[] = []
            for(const userDoc of allusersSnapshot.docs){
                const email = userDoc.id
                const postsCollectionRef = collection(db, `users/${email}/Post`)
                const postsQuery = query(postsCollectionRef, orderBy('created_at', 'desc'), limit(limits))
                const allpostSnapshot = await getDocs(postsQuery)
                allpostSnapshot.forEach((postDoc) =>{
                    const postData = { id: postDoc.id, ...postDoc.data() }
                    allPost.push(postData as post);
                })
            } 
            resolve(allPost)
        } catch (error) {
            reject(error)
        }
    })
}

export const fetchPost = (email: string, post_id:string): Promise<post> => {
    return new Promise((resolve,reject): void =>{
        try {
            db
            .collection("users")
            .doc(email)
            .collection("Post")
            .doc(post_id)
            .onSnapshot((doc) =>{
                const postData = { id: post_id, ...doc.data() }
                resolve(postData as post)    
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const fetchUserPost = (email : string, limits: number): Promise<post[] | string | any> => {
    return new Promise((resolve, reject): void =>{
        try {
            db.
               collection("users")
               .doc(email)
               .collection("Post")
               .orderBy("created_at", "desc")
               .limit(limits)
               .onSnapshot((snapshot) => {
                    const data = snapshot.docs.map((doc) => ( { id: doc.id, ...doc.data() }))
                    if(data.length <= 0){
                        reject("No post found")
                    }else{
                        resolve(data as post[])
                    }
               })

        } catch (error) {
            reject(error)
        }
    })
}
// async function test() {
//     await fetchAllPost().then((succ) =>{
//         console.log(succ)
//     }).catch((fail) =>{
//         console.log(fail)
//     })
// }
// test()
