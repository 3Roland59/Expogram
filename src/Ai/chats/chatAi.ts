// import { model,chatSession } from "../AiConfig/config";
// // import { saveChat } from '../History/chatAiDb'
// // import { db, firebase } from '../../firebaseconfig/firebase'
// // import { imageToBase64 } from "../urtils/utils";

// export const useChat = (text: string, imageUrl?: string) =>{
//     return new Promise( async(resolve, reject) =>{
//         try {
//             let reply
//             // if(text && imageUrl){
//             //     const image: string|undefined = await imageToBase64(imageUrl)
//             //   if(image){
//             //     const results = await model.generateContent([
//             //         text,
//             //         {inlineData: {data:image, mimeType: 'image/png'}}
//             //     ])
//             //     resolve(results.response.text())
//             //   }
//             // }else{
//                 reply = await chatSession.sendMessage(text)
//                 resolve(reply.response.text())
//             // }
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

// async function test(){
//     await useChat('what is this photo', 'C:\\Users\\caleb\\Desktop\\EXPOGRAM\\assets\\icon.png').then((succ) =>{ 
//         console.log(succ)
//     }).catch((fail) =>{
//         console.log(fail)
//     })
    
// }
// /*'https://cff2.earth.com/uploads/2022/12/16142438/Black-bears-2-scaled.jpg'*/
// test()