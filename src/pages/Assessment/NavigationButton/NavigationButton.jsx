import styles from "./NavigationButton.module.css";
import { ArrowRight, ArrowLeft, SkipForward } from "lucide-react";

const NavigationButton = ({index, setIndex, total, handleSubmit}) => {

    return (
        <>
        <div className={styles.footerButtons}>
            {index === 0 ? 
                (<p></p>) : (<button
                                type="button"
                                onClick={() => setIndex(prev => Math.max(0, prev - 1))}
                                disabled={index === 0}
                                className={styles.prev} >
                                <ArrowLeft className={styles.icon}/>
                            </button>)
            }

            <div className={styles.footerRight}>
                {index < total - 1 ? (<button type="button" 
                                        onClick={() => setIndex(prev => Math.min(total - 1, prev + 1))}
                                        disabled={index === total-1}
                                        className={styles.skipContainer}>
                                            <SkipForward className={styles.icon}/>
                                        </button>) : 
                                        (<p></p>)
                }
                

                {index < total - 1 ? (<button
                                        type="button"
                                        onClick={() => setIndex(prev => Math.min(total - 1, prev + 1))}
                                        disabled={index === total - 1}
                                        className={styles.next}>
                                        <ArrowRight className={styles.icon}/>
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