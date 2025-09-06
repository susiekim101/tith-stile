import { Link } from "react-router-dom"
import styles from "./Buffer.module.css";
import Header from "../Header/Header";
import { Check, ArrowRight } from "lucide-react";

const Buffer = () => {

    return (
        <div>
            <Header intake={false}/>

            <div className={styles.container}>
                <Check className={styles.icon}/>
                <h1 className={styles.title}>Form Submitted.</h1>
                <span className={styles.caption}>Your response has been successfully recorded. When you’re ready, proceed to the Stile Profile to begin your interior design assessment!</span>

                <Link to="/assessment" className={styles.button}>
                    Proceed to Stile Profile
                    <ArrowRight className={styles.arrow}/>
                </Link>

            </div>


        </div>
    )
}

export default Buffer;