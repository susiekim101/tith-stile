import styles from "./Inspiration.module.css";
import dummy from "../../../assets/graphics/dummyImage.jpg";
import emblem from "../../../assets/graphics/emblem.svg";
const Inspiration = ({text, images}) => {

    return (
        <div className={styles.container}> 
            <div className={styles.titleContainer}>
                <div className={styles.title}>
                    inspiration station
                </div>
            </div>

            <div className={styles.text}>{text}</div>

            <div className={styles.imagesGrid}>
                {images.map((image, idx) => (
                        <img key={idx} src={image} className={styles.image}/>
                ))}
            </div>
            
            <div className={styles.footer}>
                <img src={emblem} className={styles.emblem}/>
            </div>
        </div>
    );
}

export default Inspiration;