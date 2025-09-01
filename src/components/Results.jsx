{
  /*

import React, { useEffect, useState } from "react";
import getQuizOutput from "../utils/getQuizOutput";
import { useLocation } from "react-router-dom";
import styles from "../css/Results.module.css";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";


const captionKeys = ["interiorDesign", "colorPalette", "furnitureDesign"];

const Results = () => {
  const { state } = useLocation();
  const previous = state?.previous;
  console.log("previous", previous);

  const location = useLocation();
  const quizData = location.state?.quizData;
  console.log(quizData);

  const [summary, setSummary] = useState({ title: "", description: "" });
  const [images, setImages] = useState([]);
  const [captions, setCaptions] = useState({});
  const [toInclude, setToInclude] = useState([]);
  const [toAvoid, setToAvoid] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  const saveResultsToFirestore = async () => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try {
      await setDoc(doc(db, "results", userId), {
        summary,
        images,
        captions,
        toInclude,
        toAvoid,
        timestamp: new Date(),
      });
      console.log("Results saved");
    } catch (error) {
      console.error("error saving results:", error);
    }
  };

  useEffect(() => {
    console.log("quizData:", quizData);
    console.log("previous:", previous);
    console.log("previous results:", previous?.results);
    const fetchOutput = async () => {
      try {
        const result = await getQuizOutput(quizData || previous?.results);

        // Get the string inside result.descriptionSummary
        let rawJsonString = result.descriptionSummary || "";

        // Strip out code block markers like ```json\n and ```
        rawJsonString = rawJsonString
          .replace(/^```json\n/, "")
          .replace(/```$/, "")
          .trim();

        // Parse it into an actual object
        const parsed = JSON.parse(rawJsonString);

        setSummary({
          title: parsed.titleParagraph || "",
          description: parsed.descriptionSummary || "",
        });
        setImages(result.images || []);
        setCaptions(parsed.imageCaptions || {});
        setToInclude(parsed.toInclude || []);
        setToAvoid(parsed.toAvoid || []);
      } catch (error) {
        console.error("Failed to load quiz output:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOutput();
  }, []);

  useEffect(() => {
    const ready =
      summary.title &&
      summary.description &&
      images.length &&
      Object.keys(captions).length &&
      toInclude.length &&
      toAvoid.length;

    if (!loading && ready) {
      saveResultsToFirestore();
    }
  }, [loading, summary, images, captions, toInclude, toAvoid]);

  if (loading) return <div>Loading assessment...</div>;

  return (
    <div>
      <div>
        <h2 className={styles.heading}>🛋️ Your Design Personality 🪴</h2>
        <div className={styles.svgWrapper}>
          <img src={CloverSvg} alt="Clover" className={styles.clover} />
          <div className={styles.svgOverlay}>
            <p className={styles.cloverText}>{summary.title}</p>
            <p className={styles.cloverText}>{summary.description}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className={styles.heading}>Design Inspirations</h3>
        <div className={styles.imageRow}>
          {images.map((url, index) => {
            const key = captionKeys[index];
            return (
              <div key={index} className={styles.imageContainer}>
                <img className={styles.image} src={url} alt={`Design ${key}`} />
                <p className={styles.description}>
                  {captions[key] || "Loading caption..."}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <section className={styles.waveSection}>
        <img
          src={tealclover}
          alt="teal clover"
          className={styles.spinningImage}
        ></img>
        <div className={styles.waveContent}>
          <h3 className={styles.waveHeading}>Recommended Elements</h3>
          <ul>
            {toInclude.map((item, idx) => (
              <li className={styles.waveText} key={idx}>
                {item}
              </li>
            ))}
          </ul>
          <br />
          <h3 className={styles.waveHeading}>Things to Avoid</h3>
          <ul>
            {toAvoid.map((item, idx) => (
              <li className={styles.waveText} key={idx}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Link to="/quiz">
        <button className={styles.button}>Retake Quiz</button>
      </Link>
    </div>
  );
};

export default Results;

*/
}
