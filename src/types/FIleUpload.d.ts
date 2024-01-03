interface ImageUploadProps {
    url: string;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: Record<string, never>;
    pathOrder: string[];
}

export {
    ImageUploadProps
}