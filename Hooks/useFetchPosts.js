import { useEffect, useState } from "react";
import {fetchAllPost} from '../dist/fetchdata/fetchPost'
import firebase from "firebase/compat";

const useFetchPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loadLimit, setLoadLimit] = useState(40);
    const [isLoading, setIsLoading] = useState(false);
    const [justRequested, setJustRequested] = useState(false);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
        //    const data = await fetchAllPost(loadLimit)
        const unsubscribe = firebase
        .firestore()
        .collectionGroup("Post")
        .orderBy("created_at", "desc")
        .limit(loadLimit)
        .onSnapshot(snapshot => {
            const updatedPosts = snapshot.docs.map(post => ({ id: post.id, ...post.data() }));
            setPosts(updatedPosts);
      });

      return () => unsubscribe;

            // setPosts(data)
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setIsLoading(false);
        }
      }

useEffect(() => {
    
    fetchPosts();
}, [loadLimit]);

    const fetchOlderPosts = () => {
        if (!justRequested) {
            setJustRequested(true);
            setTimeout(() => {
                setJustRequested(false);
            }, 5000)
            setLoadLimit(loadLimit + 20);
        }
    };

    const refreshPosts = async () => {
        if (!justRequested) {
            setJustRequested(true);
            setTimeout(() => {
                setJustRequested(false);
            }, 5000)
            setLoadLimit(20);
        }
    };

    return {
        posts,
        isLoading,
        fetchOlderPosts,
        refreshPosts
    };
};

export default useFetchPosts;