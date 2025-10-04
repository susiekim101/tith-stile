import styles from "./Scents.module.css";
import SectionTitle from "../Components/SectionTitle";

const Scents = ({images, text}) => {
    console.log(images);
    return (
        <div className={styles.container}>
            <div className={styles.main}> 
                <SectionTitle title="scents"/>
                
                <div className={styles.imagesGrid}>
                    {images.map((image) => (
                        <img src={image} className={styles.image}/>
                    ))}
                </div>
            </div>

            <div className={styles.text}>
                {text}
            </div>
        </div>
    );
}

export default Scents;