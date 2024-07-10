import { useStoriesContext } from "../Context/StoriesContext";

const useCheckStoriesSeen = () => {
    const { stories } = useStoriesContext();

    const checkStoriesSeen = (username, email) => {
        return stories
            .filter((story) => story.username === username)
            .every((story) => story.seen_by_user.includes(email));
    };

    return { checkStoriesSeen }
}

export default useCheckStoriesSeen;