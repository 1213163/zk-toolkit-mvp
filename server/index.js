import express from "express"; import { execSync } from "child_process"; import fs from "fs"; import path from "path";
const express = require("express");
const bodyParser = require("body-parser");
const snarkjs = require("snarkjs");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// POST /prove with { birthYear, currentYear }
app.post("/prove", async (req, res) => {
  try {
    const { birthYear, currentYear } = req.body;

    // Input for circuit
    const input = { birthYear, currentYear };

    // Paths to compiled artifacts
    const wasmPath = path.join(__dirname, "../circuits/compiled/age_check.wasm");
    const zkeyPath = path.join(__dirname, "../circuits/compiled/age_check.zkey");

    // Generate proof
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      input,
      wasmPath,
      zkeyPath
    );

    // Load verification key
    const vKey = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../circuits/verification_key.json"))
    );

    // Verify proof
    const verified = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    res.json({ proof, publicSignals, verification: verified });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proof generation failed", details: err.message });
  }
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
