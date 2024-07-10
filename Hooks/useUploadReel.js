import { useState } from 'react'
import useUploadPicture from './useUploadPicture'
import {uploadReel} from '../dist/database/uploadreals'

const useUploadReel = () => {
    const [loader, setLoader] = useState(false)
    const {uploadPicture} = useUploadPicture()


    const UploadReel = async (videoUrl, caption, currentUser) => {
        if(!loader) {
            setLoader(true);
            try {
                const timestamp = new Date().getTime();
                    let vid = await uploadPicture(videoUrl, 'Reels', `${currentUser.username}${timestamp}`, 'video' )
                
                await uploadReel(currentUser.username, currentUser.user_id, currentUser.email, currentUser.profile_picture, vid, caption)
            
                
            } catch (error) {
                console.log('deep new:',error)
            } finally {
                setLoader(false);
            }
        }
    }

    return {
        UploadReel,
        loader
    }
}

export default useUploadReel