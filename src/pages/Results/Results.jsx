import Header from "./Header/Header.jsx";
import Theme from "./Theme/Theme.jsx";
import Summary from "./Summary/Summary.jsx";
import dummy from "../../assets/graphics/dummyImage.jpg";
import pink from "../../assets/graphics/pink.png";
import green from "../../assets/graphics/green.png"
import yellow from "../../assets/graphics/yellow.png"
import styles from "./Results.module.css"
import Colors from "./Colors/Colors.jsx";
import Scents from "./Scents/Scents.jsx";

const Results = () => {
    const summaryText = `
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae 
    pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu 
    aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. 
    Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class 
    aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`

    const descriptionText = `
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae 
    pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu 
    aenean sed diam urna tempor.`

    const colorImages = [pink, green, yellow, pink, green, yellow];
    const scentImages = [dummy, dummy, dummy];

    return (
        <div className={styles.container}>
            <Header/>
            <h1 className={styles.title}>Your Stile Profile Blueprint.</h1>
            <h1 className={styles.brand}>TORI IN THE HOUSE</h1>
            <Theme theme="Velvet Vanguard" descriptors={["lush", "elegant", "timeless"]} />
            <Summary text={summaryText} colorImages={colorImages}/>
            <Colors images={colorImages} text={descriptionText}/>
            <Scents images={scentImages} text={descriptionText}/>
        </div>
    );
}

export default Results;