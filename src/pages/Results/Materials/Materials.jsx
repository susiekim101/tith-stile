import styles from "./Materials.module.css";
import SectionTitle from "../Components/SectionTitle";
const Materials = ({image}) => {

    return (
        <div className={styles.container}>
            <SectionTitle title="materials"/>
            <div className={styles.imageContainer}>
                <img src={image} className={styles.image}/>
            </div>
        </div>
    );
}

export default Materials;