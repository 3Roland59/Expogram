import { useState, useEffect } from 'react'
import firebase from 'firebase/compat';


const useFetchRequests = ({user}) => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState({});

    useEffect(() => {
        if (user.followersRequset.length < 1) {
            setRequests([]); 
            return;
        }
        else {
            if(!loading) {
                setLoading(true);
                try {
                    const unsubscribe = firebase
                    .firestore()
                    .collection("users")
                    .where(firebase.firestore.FieldPath.documentId(), "in", user.followersRequset)
                    .onSnapshot((snapshot) => {
                        setRequests(snapshot.docs.map((doc) => doc.data()));
                    });
            
                    return unsubscribe;
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        }
    }, [user.followersRequset]);

    return {
        requests,loading
    }
}

export default useFetchRequests