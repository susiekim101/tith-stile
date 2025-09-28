import fs from "fs";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
    credential: applicationDefault(),
});

const db = getFirestore();
const INPUT_PATH = "./scents.json";

async function run() {
    const raw = fs.readFileSync(INPUT_PATH, "utf8");
    const scents = JSON.parse(raw);

    if(!Array.isArray(scents)) {
        throw new Error("Expected scents.json to contain an array of objects.");
    }

    console.log(`Preparing to write ${scents.length} documents to styles/scents/scents`);

    const batch = db.batch();
    for(const item of scents) {
        const { scent, description, image } = item;
        const collection = db.collection("stiles").doc("scents").collection("scents");
        const ref = collection.doc(String(scent));
        batch.set(ref, {"scent": scent, "description": description, "image": image}, {merge: false});
    }
    await batch.commit();
    console.log(`Committed ${scents.length} docs`);

    console.log("Done");
    process.exit(0);
}

run().then(() => {
    console.log("Done");
    process.exit(0);
}).catch( (e) => {
    console.error(e);
    process.exit(1);
});