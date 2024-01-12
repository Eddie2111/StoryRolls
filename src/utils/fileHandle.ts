// 'use server';
// import { edgestore } from '@edgestore/node';

// async function fileReplace(file: File, oldFileUrl: string) {
//     const res = await edgestore.publicFiles.upload({
//         file,
//         options: {
//         replaceTargetUrl: oldFileUrl || 'Untitled',
//         },
//     });
//     return res.url;
// }

// async function fileDelete (fileUrl: string) {
//     const res = await edgestore.publicFiles.delete({
//         url: fileUrl || 'Untitled',
//     });
//     return res;
// }

// export {
//     fileReplace,
//     fileDelete
// }