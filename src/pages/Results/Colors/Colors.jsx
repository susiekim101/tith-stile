import styles from "./Colors.module.css";
import SectionTitle from "../Components/SectionTitle";

const Colors = ({images, text}) => {

    return (
        <div id="colors" className={styles.container}>
            <div className={styles.main}>
                <SectionTitle title="colors"/>

                <div className={styles.imagesGrid}>
                    {images.map((image, idx) => (
                            <img key={idx} src={image} className={styles.image}/>
                    ))}
                </div>
            </div>

            <div className={styles.text}>
                {text}
            </div>

        </div>
    );
}

export default Colors;