import styles from "./NavigationButton.module.css";
import skip from "../../../assets/icons/skip-icon.svg";
import prev from "../../../assets/icons/left-arrow.svg";
import next from "../../../assets/icons/right-arrow.svg";

const NavigationButton = ({index, setIndex, total, handleSubmit}) => {
    /*const [skipIcon, setSkipURL] = useState(null);

    useEffect(() => {
        const storage = getStorage();
        const skipRef = ref(storage, "icons/skip-icon.png");

        getDownloadURL(skipRef)
            .then(url => setSkipURL(url))
            .catch(error => console.error("Failed to fetch skip icon: ", error));
    }, []); */

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
                                <img src={prev} className={styles.icon}/>
                            </button>)
            }

            <div className={styles.footerRight}>
                {index < total - 1 ? (<button type="button" 
                                        onClick={() => setIndex(prev => Math.min(total - 1, prev + 1))}
                                        disabled={index === total-1}
                                        className={styles.skipContainer}>
                                            <img src={skip} className={styles.icon}/>
                                        </button>) : 
                                        (<p></p>)
                }
                

                {index < total - 1 ? (<button
                                        type="button"
                                        onClick={() => setIndex(prev => Math.min(total - 1, prev + 1))}
                                        disabled={index === total - 1}
                                        className={styles.next}>
                                        <img src={next} className={styles.icon}/>
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