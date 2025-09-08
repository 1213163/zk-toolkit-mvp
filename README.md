# ZK Toolkit MVP – Zero-Knowledge Proof Demo

## Project Overview

**ZK Toolkit MVP** is a minimal toolkit demonstrating how **zero-knowledge proofs (ZKPs)** can be applied practically for developers and businesses.
This demo focuses on a simple **age verification**: users can prove they are 18 or older without revealing their birthdate.

**Project goals:**

* Implement a working zero-knowledge proof (ZKP) MVP.
* Provide a proof generator and verifier.
* Deliver a simple interactive frontend demo for testing and showcasing.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Project Structure](#project-structure)
4. [Circuit Details](#circuit-details)
5. [Contributing](#contributing)
6. [License](#license)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/<username>/zk-toolkit-mvp.git
cd zk-toolkit-mvp
```

2. **Install dependencies**

```bash
npm install
npm install -g snarkjs circom
```

3. **Compile the circuit**

```bash
cd circuits
circom age_check.circom --r1cs --wasm --sym -o compiled
snarkjs groth16 setup compiled/age_check.r1cs powersOfTau28_hez_final_10.ptau compiled/age_check.zkey
snarkjs zkey export verificationkey compiled/age_check.zkey verification_key.json
```

> Note: The `compiled/` folder contains build artifacts – **do not commit**. Add it to `.gitignore`.

4. **Start the server**

```bash
cd ../server
node index.js
```

5. **Open the frontend**

* Open `client/index.html` in your browser.
* Enter a birth year and click “Check” to generate and verify a proof.

---

## Usage

1. Enter a **birth year** in the frontend input field.
2. Click **Check**.
3. The output shows:

* `proof` → JSON representation of the generated ZKP.
* `publicSignals` → public outputs (`isAdult`).
* `verification` → whether the proof is valid.

---

## Project Structure

```
zk-toolkit-mvp/
├─ circuits/
│  ├─ age_check.circom       # Circuit: age ≥ 18
│  └─ compiled/              # Build artifacts (ignored in Git)
├─ server/
│  └─ index.js               # Node.js API
├─ client/
│  └─ index.html             # Frontend demo
├─ input.json                # Test input
├─ package.json
└─ README.md
```

---

## Circuit Details

* **Template:** `AgeCheck`
* **Inputs:**

  * `birthYear` (integer)
  * `currentYear` (integer)
* **Output:**

  * `isAdult = 1` if age ≥ 18, otherwise 0
* **Logic:** `age = currentYear - birthYear; isAdult = age >= 18 ? 1 : 0`
* **Purpose:** Demonstrates a simple zero-knowledge proof constraint without revealing sensitive information.

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes using **conventional commits**
4. Push to your branch and open a Pull Request

**Example commit messages:**

* `feat(circuit): add age check circuit`
* `feat(api): add proof generation endpoint`
* `feat(frontend): add interactive demo page`

---

## License

This project is licensed under the **MIT License** – see `LICENSE` for details.

---

**Tips:**

* Add screenshots in the **Usage** section for better clarity.
* Include a “Next Steps” section if you plan to expand your toolkit.
* Provide links to ZKP resources for readers who want to understand the theory behind the implementation.
