import styles from "./Summary.module.css";
import { ChevronDown } from 'lucide-react';

const Summary = ({text, colorImages}) => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <span className={styles.summaryText}>{text}</span>
            </div>

            <div className={styles.colorsContainer}>
                {colorImages.map((blob, idx) => (
                    <img key={idx} src={blob} className={styles.colorBlob}/>
                ))}
            </div>

            <div className={styles.textContainer}>
                <span className={styles.summaryText}>Velvet Vanguard is a home that feels lush, bold, and timeless—inviting you to live fully, feel grounded, and step into your next chapter with ease and joy.</span>
            </div>

            <ChevronDown className={styles.chevron}/>
        </div>
    );
}

export default Summary;