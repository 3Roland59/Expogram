import { db, firebase } from '../firebaseconfig/firebase'   

type notifications = {
    id: string,
    data: string | number | boolean | object
}
export const fetchNotifications = (userEmail : string): Promise<notifications[] | any>=>{
    return new Promise((resolve, reject ): void =>{
        try {
            db
              .collection('users')
              .doc(userEmail)
              .collection(' notifications')
              .onSnapshot((snapshot): void => {
                const notifications = snapshot.docs.map((doc) =>{
                    return ({id: doc.id, ...doc.data()})
                })
                resolve(notifications)
              })
        } catch (error) {
            reject(error)
        }
    })
}


