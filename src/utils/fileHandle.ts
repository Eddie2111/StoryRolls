'use server';
import { edgestore } from '@edgestore/node';

async function fileReplace(file: File, oldFileUrl: string) {
    const res = await edgestore.publicFiles.upload({
        file,
        options: {
        replaceTargetUrl: oldFileUrl,
        },
    });
    return res.url;
}

async function fileDelete (fileUrl: string) {
    const res = await edgestore.publicFiles.delete({
        url: fileUrl,
    });
    return res;
}

export {
    fileReplace,
    fileDelete
}