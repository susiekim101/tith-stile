import styles from "../../css/Assessment.module.css";
const NavigationButton = ({index, setIndex, total, handleSubmit}) => {
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
                                ←
                            </button>)
            }
            {index < total - 1 ? (<button
                                    type="button"
                                    onClick={() => setIndex(prev => Math.min(total - 1, prev + 1))}
                                    disabled={index === total - 1}
                                    className={styles.next}>
                                    →
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
        </>
    );
}

export default NavigationButton;