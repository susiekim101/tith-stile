import styles from "../../css/Assessment/NavigationButton.module.css";
import {useEffect, useState} from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const NavigationButton = ({index, setIndex, total, handleSubmit}) => {
    const [skipIcon, setSkipURL] = useState(null);

    useEffect(() => {
        const storage = getStorage();
        const skipRef = ref(storage, "icons/skip-icon.png");

        getDownloadURL(skipRef)
            .then(url => setSkipURL(url))
            .catch(error => console.error("Failed to fetch skip icon: ", error));
    }, []); 

    return (
        <>
        <div className={styles.footerButtons}>
            {console.log(`Index: ${index}, Total: ${total}`)}
            {index === 0 ? 
                (<p></p>) : (<button
                                type="button"
                                onClick={() => setIndex(prev => Math.max(0, prev - 1))}
                                disabled={index === 0}
                                className={styles.prev} >
                                ← Previous
                            </button>)
            }

            <div className={styles.footerRight}>
                <button type="button" 
                        onClick={() => setIndex(prev => Math.min(total - 1, prev + 1))}
                        disabled={index === total-1}
                        className={styles.skipContainer}>

                    <div className={styles.skip}> Skip </div>

                    {skipIcon && <img src={skipIcon} className={styles.skipIcon}/>}
                </button>

                {index < total - 1 ? (<button
                                        type="button"
                                        onClick={() => setIndex(prev => Math.min(total - 1, prev + 1))}
                                        disabled={index === total - 1}
                                        className={styles.next}>
                                        Next →
                                    </button>) : 
                                    (<button
                                        type="button"
                                        onClick={handleSubmit}
                                        className={styles.submitForm}
                                        >
                                        Submit
                                        </button>
                                    )
                }
            </div>
        </div>
        </>
    );
}

export default NavigationButton;