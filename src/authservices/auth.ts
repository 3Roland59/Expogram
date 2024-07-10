import { firebase } from "../firebaseconfig/firebase";  
import { storeUserDetails } from "../database/database";
import { auth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "../firebaseconfig/firebase";
import { signInWithRedirect } from "firebase/auth";

export const onRegister = (email: string,username: string, password: string, country: string, profile_picture: string, bio: string, link: string): Promise<boolean | any> => {
    return new Promise(async (resolve, reject): Promise<void>=> {  
        try {
            const authUsers = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if(authUsers.user?.uid && authUsers.user.email){
                const create = await storeUserDetails(authUsers.user.uid,authUsers.user.email, username, country, profile_picture, bio, link);
                if(create){
                    resolve(true);
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}
// continue with google account
export const contiueWithGoogle = (): Promise<boolean | any> => {
    return new Promise(async (resolve, reject): Promise<void> => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            resolve(true);
        } catch (error) {
            reject(error);
        } 
    })
}

// export const loginWithGoogle = ():Promise<boolean | any> =>{
//     return new Promise(async (resolve, reject): Promise<void> =>{
//         try {
//             const provider = new firebase.auth.GoogleAuthProvider();
//             const result = await firebase.auth().signInWithPopup(provider)
//             //const token = result.credential?.accessToken
//             const user = result.user
//             resolve(user)
//         }catch(error){
//             reject(error)
//         }
//     })
// }
export const loginWithGoogle = ():Promise<any> => {
    return new Promise( async (resolve, reject):Promise<void> => {
        try {
            //const auth = getAuth()
            const provider = new GoogleAuthProvider()
            await signInWithRedirect(auth, provider)
            const result = await getRedirectResult(auth)
            //const credential = GoogleAuthProvider.credentialFromResult(result)
           // const token = credential?.accessToken
           if(result){
                const user = result.user
                resolve(user)
           }
        } catch (error) {
            reject(error)
        }
    })
}
// Function to log in to an existing user account
export const onLogin = (email: string, password: string): Promise<boolean | any> => {
    return new Promise(async (resolve, reject): Promise<void> => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            resolve(true);
        } catch (error) {
            //console.log(error)
            reject(error);
        }
    })
}

export const onLogout = (): Promise<boolean | any> => {
    return new Promise(async (resolve, reject): Promise<void> => {
        try {
            await firebase.auth().signOut();
            resolve(true);
        } catch (error) {
            reject(error);
        }
    })
}

// async function test(){
//    const withgoogle = await loginWithGoogle()
//    console.log(withgoogle)
// }
// test()
