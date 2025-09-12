import styles from "./Theme.module.css";
import dummy from "../../../assets/graphics/dummyImage.jpg";
const Theme = ({theme, descriptors}) => {
    
    return (
        <div className={styles.container}>
            <h1 className={styles.theme}>{theme}</h1>
            <div className={styles.descriptors}>
                {descriptors.map((word, idx) => (
                    <>
                        {idx == 0 ?  null : <div className={styles.separator}/>}
                        <h1 key={idx} className={styles.word}>{word}</h1>
                    </>
                    ))}
            </div>

            <div className={styles.imageContainer}>
                <h1 className={styles.imageText}>style for stability</h1>
                <img src={dummy} className={styles.image}/>
            </div>

            <div className={styles.captionContainer}>
                <p className={styles.caption}>Your Stile Profile is designed as inspiration, so your home may not match this moodboard — but its essence will guide every choice.</p>
            </div>
        </div>
    );
}

export default Theme;