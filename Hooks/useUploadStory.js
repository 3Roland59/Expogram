import { useState } from 'react'
import useUploadPicture from './useUploadPicture'
import {uploadStory} from '../dist/database/uploadStory'

const useUploadStory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {uploadPicture} = useUploadPicture()

    const UploadStory = async (imageUrl, currentUser, type='image') => {
        if(!isLoading) {
            setIsLoading(true);
            try {
                const timestamp = new Date().getTime();
                const uploadedImageUrl = await uploadPicture(imageUrl.uri, 'Story', `${currentUser.username}${timestamp}`);
                console.log('url: ', uploadedImageUrl)
                await uploadStory( uploadedImageUrl, currentUser.username, currentUser.username, currentUser?.profile_picture, currentUser.user_id,currentUser.email)
                
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    return {
        UploadStory,
        isLoading
    }
}

export default useUploadStory