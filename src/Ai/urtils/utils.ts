// const fs = require('fs')
// const imageToBlob = async (imageUrl: string): Promise<Blob | undefined> => {
//     try {
//         const response = await fetch(imageUrl)
//         const blob: Blob = await response.blob()
//         return blob
//     } catch (error) {
//         console.log(error)
//     }
//     return undefined;
// }

// export const imageToBase64 = async (imageUrl: string): Promise<string|undefined> =>{
//     try {
//         //const blob: Blob | undefined = await imageToBlob(imageUrl)
//         const reader = fs.readFileSync(imageUrl)
//         const base_64 = Buffer.from(reader).toString('base64')
//         return base_64
//     } catch (error) {
//         console.log(error)
//     }
// }
