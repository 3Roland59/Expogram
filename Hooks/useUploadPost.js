import { useState } from 'react'
import useUploadPicture from './useUploadPicture'
import {uploadPost} from '../dist/database/uploadpost'

const useUploadPost = () => {
    const [loader, setLoader] = useState(false)
    const {uploadPicture} = useUploadPicture()


    const UploadPost = async (imageUrl, caption, currentUser, hashtag) => {
        if(!loader) {
            setLoader(true);
            try {
                let pics =[]
                for(let i = 0;i<imageUrl.length; i++){
                    const timestamp = new Date().getTime();
                    let pic = await uploadPicture(imageUrl[i], 'UserPost', `${currentUser.username}${timestamp}` )
                    pics = [...pics, pic]
                }
                console.log('Uploadpost:', pics, currentUser, caption, hashtag)

                await uploadPost(currentUser.username, currentUser.user_id, currentUser.email, currentUser?.profile_picture, pics, caption, hashtag)
               

                
            } catch (error) {
                console.error(error);
            } finally {
                setLoader(false);
            }
        }
    }

    return {
        UploadPost,
        loader
    }
}

export default useUploadPost