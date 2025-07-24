import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";

const ImageUpload = ({formValues, setFormValues, id}) => {
    const deleteImages = async (userId) => {
        const storage = getStorage();
        const folderRef = ref(storage, `userImages/${userId}`);

        try {
            const result = await listAll(folderRef);
            const deletePromises = result.items.map((itemRef) => deleteObject(itemRef));

            await Promise.all(deletePromises);
            console.log("All images deleted for user: ", error);
        } catch (error) {
            console.error("Error deleting user images: ", error);
        }
    }

    const uploadToFirestore = async (image, userId) => {
        await deleteImages(userId);
        const storage = getStorage();
        const imageRef = ref(storage, `userImages/${userId}/${image.name}`);

        // Upload image to imageRef in Firebase Storage
        await uploadBytes(imageRef, image);

        // Obtain the URL to image, and return
        const downloadURL = await getDownloadURL(imageRef);
        formValues[id] = downloadURL;
        return downloadURL;
    };

    return (
        <>
            <input value={formValues[id] || ""} type="file" accept="image/*" onChange={uploadToFirestore} multiple/>
        </>
    );
}

export default ImageUpload;