import { useState, DragEvent, ChangeEvent } from "react";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
} from "firebase/storage";
import { auth, storage } from "../../../firebase/config";
import styles from "../QuestionTypes/ImageUpload.module.css";
import { Upload, CircleCheckBig } from "lucide-react";

const ImageUpload = ({ formValues, setFormValues, id }) => {
    const MAX_FILES = 5;
    const user = auth.currentUser;
    const userId = user?.uid;
    const [selectedImages, setSelectedImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    if (!formValues[id]) {
        formValues[id] = [];
    }

    const deleteImages = async () => {
        const folderRef = ref(storage, `user-images/${userId}`);

        try {
            const images = await listAll(folderRef);
            const deletePromises = images.items.map((itemRef) => deleteObject(itemRef));
            await Promise.all(deletePromises);
            console.log("selectedImages.length: ", selectedImages.length);
            setSelectedImages([]);
            formValues[id] = [];
            console.log("All images deleted for user");
        } catch (error) {
            console.error("Error deleting user images: ", error);
        }
    }

    const handleImageUpload = async (imageList = []) => {
        await deleteImages();

        const uploadPromise = imageList.map(async (image) => {
            if (!userId) {
                console.error("User not authenticated");
                return;
            }
            // Obtain reference to image
            const imageRef = ref(storage, `user-images/${userId}/${image.name}`);
            // Upload image to imageRef
            await uploadBytes(imageRef, image);
            // Obtain URL to uploaded image
            return await getDownloadURL(imageRef);
        });

        try {
            const urls = await Promise.all(uploadPromise);
            setFormValues((prev) => ({ ...prev, [id]: urls }));
            setSelectedImages(imageList);
            console.log(formValues[id]);
        } catch (error) {
            console.error("Upload failed: ", error);
        }
    };
    const onImagesSelected = (images) => {
        if (!images || images.length === 0)
            return;
        const trimmedImages = Array.from(images).slice(0, MAX_FILES);
        handleImageUpload(trimmedImages);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        console.log("is dragging");
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        console.log("stopped dragging");
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        onImagesSelected(e.dataTransfer.files);
        console.log("handle dragging");
    }

    const handleImageInputChange = (e) => {
        onImagesSelected(e.target.files);
    };

    return (
        <div className={styles.answerContainer}>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`${styles.uploadContainer} ${isDragging ? styles.dragging : ""}`}
            >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageInputChange}
                    className={styles.hiddenInput}
                    id="image-upload"
                />

                <label htmlFor="image-upload" className={styles.uploadButton}>
                    <div>{(selectedImages.length == 0 && formValues[id].length == 0) ? <Upload className={styles.uploadIcon} /> : <CircleCheckBig className={styles.uploadIcon} />}</div>
                    <div className={styles.dragText}>Drag & Drop</div>
                </label>

                {console.log("Selected Images Length: ", selectedImages.length)}
                {console.log("Form Values Length: ", formValues[id].length)}

            </div>

            <div className={styles.footer}>
                <label className={styles.uploadText} htmlFor="image-upload">
                    Upload Images
                </label>

                {(selectedImages.length !== 0 || formValues[id].length !== 0) &&
                    <button
                        className={styles.deleteText}
                        onClick={deleteImages}
                        type="button"
                    >
                        Delete Images
                    </button>
                }
            </div>
        </div>
    );

}

export default ImageUpload;