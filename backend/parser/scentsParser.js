import fs from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../service-key.json" with { type: "json"};

initializeApp({
    credential: cert(serviceAccount),
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
    for(const scent of scents) {
        const { name, ...data } = scent;
        const collection = db.collection("styles").doc("scents").collection("scents");
        const ref = collection.doc(String(name));
        batch.set(ref, data, {merge: true});
    }
    await batch.commit();
    console.log(`Committed ${scents.length} docs`);

    console.log("Done");
    process.exit(0);
}

run().catch( (e) => {
    console.error(e);
    process.exit(1);
});