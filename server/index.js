import express from "express";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

const CIRCUIT_PATH = path.join(__dirname, "../circuits");
const WASM_PATH = path.join(CIRCUIT_PATH, "compiled/age_check.wasm");
const ZKEY_PATH = path.join(CIRCUIT_PATH, "compiled/age_check.zkey");

app.post("/prove", (req, res) => {
    const { birthYear, currentYear } = req.body;
    fs.writeFileSync("input.json", JSON.stringify({ birthYear, currentYear }));

    execSync(`snarkjs groth16 fullprove input.json ${WASM_PATH} ${ZKEY_PATH} proof.json public.json`);

    const proof = JSON.parse(fs.readFileSync("proof.json"));
    const publicSignals = JSON.parse(fs.readFileSync("public.json"));
    const verification = execSync(`snarkjs groth16 verify verification_key.json public.json`).toString();

    res.json({ proof, publicSignals, verification });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
