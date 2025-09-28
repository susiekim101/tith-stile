import Header from "./Header/Header.jsx";
import Theme from "./Theme/Theme.jsx";
import Summary from "./Summary/Summary.jsx";
import pink from "../../assets/graphics/pink.png";
import dummy from "../../../src/assets/graphics/dummyImage.jpg"
import green from "../../assets/graphics/green.png"
import yellow from "../../assets/graphics/yellow.png"
import pinkPaint from "../../assets/graphics/pink.svg";
import greenPaint from "../../assets/graphics/green.svg"
import yellowPaint from "../../assets/graphics/yellow.svg"
import styles from "./Results.module.css"
import Colors from "./Colors/Colors.jsx";
import Scents from "./Scents/Scents.jsx";
import Materials from "./Materials/Materials.jsx";
import Inspiration from "./Inspiration/Inspiration.jsx";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase/config.js";
import { getDoc, doc, sum } from "firebase/firestore";
import { auth } from "../../firebase/config.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userStile } = location.state || {};
    const [stileProfile, setStileProfile] = useState(null);

    useEffect(() => {
        if(!location.state) {
            navigate("/landing");
            return;
        } 
        const fetchProfile = async () => {
            const userId = auth.currentUser ? auth.currentUser.uid : crypto.randomUUID();
            const ref = doc(db, "stile-profiles", userId);
            const snap = await getDoc(ref);

            if(snap.exists()) {
                setStileProfile(snap.data());
            } else {
                console.error("No stile profile found for user: ", userId);
            }
        };
        fetchProfile();
    }, []);



    if(!stileProfile) {
        return (
            <div>Loading your Stile Profile...</div>
        );
    }


    console.log("User's stile: ", stileProfile);
    
    const summaryText = `
    Velvet Vanguard wraps your home in rich layers of color, texture, and warmth. Think polished mahogany, deep jewel tones, and soft, touchable fabrics creating a space that feels both bold and welcoming. Inspired by the Harlem Renaissance, this style captures the spirit of jazz and the era’s effortless elegance—vibrant, expressive, and full of life—bringing a sense of effortless elegance and joy into your everyday.
    
    Merlot, indigo, forest green, ochre, soft blush, and bone flow through your seating, rugs, pillows, and lighting, blending into a palette that feels harmonious and timeless. Materials like polished mahogany, plush velvet, woven rattan, low‑pile rugs, warm brass, and soft leather or faux leather accents add richness and a sense of ease to every corner.
    
    There’s a sense of harmony and livable elegance here—jazz softly playing in the background, amber light glowing against rich textures, and subtle scents of amber, sandalwood, and vanilla gently in the air while you [read your favorite book / host a game night / catch up on your favorite show]. A pet‑safe Calathea or easy‑care ZZ plant adds a little life and movement, completing a space that’s both grounding and vibrant.
    `

    const descriptionText = `
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae 
    pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu 
    aenean sed diam urna tempor.`

    const colors = [pink, green, yellow, pink, green, yellow];
    const colorImages = [pinkPaint, greenPaint, yellowPaint, pinkPaint, greenPaint, yellowPaint];
    // const scentImages = [lavender, ylang, plumeria];
    const scentImages = stileProfile["scents"]["scents"];
    const scentDescription = stileProfile["scents"]["scent_reasoning"];
    const inspirationImages = [pink, pink, pink, pink, pink, pink, pink, pink, pink];
    const allText = `
    Your Stile Profile Blueprint is Velvet Vanguard, lush, bold, and timeless.
    ${summaryText}
    ${scentDescription}
    `;

    return (    
        <div className={styles.container}>
            <Header text={allText}/>
            <h1 className={styles.title}>Your Stile Profile Blueprint.</h1>
            <h1 className={styles.brand}>tori in the house</h1>
            <Theme theme="Velvet Vanguard" descriptors={["lush", "elegant", "timeless"]} />
            <Summary text={summaryText} colorImages={colors}/>
            <Colors images={colorImages} text={descriptionText}/>
            <Scents images={scentImages} text={scentDescription}/>
            <Materials image={dummy}/>
            <Inspiration text={descriptionText} images={inspirationImages}/>
        </div>
    );
}

export default Results;