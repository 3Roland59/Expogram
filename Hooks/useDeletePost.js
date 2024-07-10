import firebase from "firebase/compat";
import { db } from "../dist/firebaseconfig/firebase";

const useDeletePost = () => {
    const deletePost = async(post) => {
        try {
            // console.log('to del:', post)
            const querySnapshot = await db
                .collection('users')
                .doc(post.email)
                .collection('Post')
                .where('created_at', '==', post.created_at)

                // Get the query snapshot
            const getQuerySnapshot = await querySnapshot.get();

            const batch = db.batch();
            getQuerySnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('deleted post');
        } catch (error) {
            console.log('pdelete failed:',error);
        }
    }

    const deleteStory = async(story) => {
        try {
            // console.log('to del:', story)
            const querySnapshot = await db
                .collection('users')
                .doc(story.user_email)
                .collection('stories')
                .where('created_at', '==', story.created_at)
                
                // Get the query snapshot
            const getQuerySnapshot = await querySnapshot.get();

            const batch = db.batch();
            getQuerySnapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('deleted story');
        } catch (error) {
            console.log('sdelete failed: ',error);
        }
    }

    return {
        deletePost,
        deleteStory
    }
}

export default useDeletePost;
