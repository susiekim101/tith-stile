import { 
        getStorage, 
        ref, 
        uploadBytes, 
        getDownloadURL, 
        listAll, 
        deleteObject 
} from "firebase/storage";
import { auth } from "../../../firebase/config";

const ImageUpload = ({setFormValues, id}) => {
    const MAX_FILES = 5;
    const user = auth.currentUser;
    const userId = user?.uid;

    const deleteImages = async () => {
        const storage = getStorage();
        const folderRef = ref(storage, `user-images/${userId}`);

        try {
            // Fetch list of all objects in folder
            const result = await listAll(folderRef);
            // Create a promise to delete all objects
            const deletePromises = result.items.map((itemRef) => deleteObject(itemRef));

            await Promise.all(deletePromises);
            console.log("All images deleted for user");
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
            if(!userId) {
                console.error("User not authenticated");
                return;
            }
            const imageRef = ref(storage, `user-images/${userId}/${file.name}`);
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
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files, userId)} multiple/>
        </>
    );
}

export default ImageUpload;