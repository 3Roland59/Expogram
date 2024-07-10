import firebase from "firebase/compat";

const useHandleRequests = ({ currentUser, user }) => {
    const handleRequests = (accept) => {
        try {
          firebase
            .firestore()
            .collection("users")
            .doc(user.email)
            .update({
              followingRequest: firebase.firestore.FieldValue.arrayRemove(currentUser.email),
              ...(accept && {
                following: firebase.firestore.FieldValue.arrayUnion(currentUser.email),
              }),
            });
    
          firebase
            .firestore()
            .collection("users")
            .doc(currentUser.email)
            .update({
              followersRequset: firebase.firestore.FieldValue.arrayRemove(user.email),
              ...(accept && {
                followers: firebase.firestore.FieldValue.arrayUnion(user.email),
              }),
            });

          if (accept) {
            firebase.firestore().collection("users").doc(user.email).update({
                event_notification: firebase.firestore.FieldValue.increment(1)
            });
          }

        } catch (error) {
          console.log(error);
        }
    };

    return {
        handleRequests
    }
}

export default useHandleRequests