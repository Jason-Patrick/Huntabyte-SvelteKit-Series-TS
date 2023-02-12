export const serializeNonPOJOs = (obj: {}) => {
    return structuredClone(obj)
}

export const getImageURL = (collectionId: string, recordId: string, fileName: string, size: string = '0x0') => {
    const fileURL =`http://127.0.0.1:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
    return fileURL;
}