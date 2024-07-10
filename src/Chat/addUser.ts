import { db, firebase} from '../firebaseconfig/firebase'

type user ={
    email: string,  
    username: string,
    name: string,
    profile_picture: string,
}

export const addUser = (user: user, currentUserEmail: string): Promise<boolean | string> =>{
    return new Promise(async (resolve, reject): Promise<void> =>{
        try {
            const newUser = {
                email: user.email,
                username: user.username,
                name: user.username,
                profile_picture: user.profile_picture,
                status: 'seen'
            }
            await db
                .collection('users')
                .doc(currentUserEmail)
                .collection('chat')
                .doc(user.email)
                .set(newUser)
            resolve(true)
        } catch (error) {
            reject(error as string)
        }
    })
}