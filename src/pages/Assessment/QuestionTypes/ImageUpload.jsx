import { useState } from "react";
import { 
        getStorage, 
        ref, 
        uploadBytes, 
        getDownloadURL, 
        listAll, 
        deleteObject 
} from "firebase/storage";

const ImageUpload = ({formValues, setFormValues, id, userId}) => {
    const MAX_FILES = 5;

    const deleteImages = async () => {
        const storage = getStorage();
        const folderRef = ref(storage, `userImages/${userId}`);

        try {
            // Fetch list of all objects in folder
            const result = await listAll(folderRef);
            // Create a promise to delete all objects
            const deletePromises = result.items.map((itemRef) => deleteObject(itemRef));

            await Promise.all(deletePromises);
            console.log("All images deleted for user: ", error);
        } catch (error) {
            console.error("Error deleting user images: ", error);
        }
    }

    const handleImageUpload = async (files) => {
        // Convers uploaded files into array
        const fileList = Array.from(files).slice(0, MAX_FILES);
        const storage = getStorage();


        await deleteImages();
        // Array of promises
        const uploadPromise = fileList.map(async (file) => {
            const imageRef = ref(storage, `userImages/${userId}/${image.name}`);
            await uploadBytes(imageRef, file);
            return await getDownloadURL(imageRef);
        });

        try {
            const urls = await Promise.all(uploadPromise);
            setFormValues((prev) => ({...prev, [id]: urls}));
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <>
            <input value={formValues[id] || ""} type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files, userId)} multiple/>
        </>
    );
}

export default ImageUpload;