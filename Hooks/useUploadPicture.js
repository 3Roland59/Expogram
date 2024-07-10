import { useState } from "react";
import { storage } from "../dist/firebaseconfig/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const useUploadPicture = () => {
  const [uploading, setUploading] = useState(false);

  const uploadPicture = async (uri, folder, name, fileType='image') => {
    if (!uploading) {
      setUploading(true);
      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        // Determine the file extension and MIME type
        let fileExtension = '';
        let mimeType = '';
        switch (fileType) {
          case 'image':
            fileExtension = 'jpg';
            mimeType = 'image/jpeg';
            break;
          case 'video':
            fileExtension = 'mp4';
            mimeType = 'video/mp4';
            break;
          case 'audio':
            fileExtension = 'mp3';
            mimeType = 'audio/mpeg';
            break;
          default:
            throw new Error('Unsupported file type');
        }

        const storageRef = ref(storage, `${folder}/${name}-${Date.now()}.${fileExtension}`);

        const uploadTask = uploadBytesResumable(storageRef, blob, {
          contentType: mimeType,
        });

        uploadTask.on("state_changed", (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log("Upload is " + progress + "% done");
        });

        await uploadTask;

        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;

      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  };

  return {
    uploadPicture,
    uploading,
  };
};

export default useUploadPicture;
