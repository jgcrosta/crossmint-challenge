# Crossmint Megaverse Mapping Challenge Solution

## 🌌 Overview

This repository houses the solution to the Crossmint Megaverse Mapping Challenge. The challenge revolves around a 2D representation known as the Crossmint Megaverse map, which is populated by elements such as spaces, polyanets, soloons, and comeths. The application has been deployed with Vercel and is accessible [here](https://crossmint-challenge-jgc.vercel.app).

## 🛠 Technology Stack

- Typescript: A strongly typed superset of JavaScript.
- Node.js: The runtime environment for executing JavaScript server-side.
- Next.js: A React framework for building user interfaces.

## 🚀 Getting Started

In order to run the Crossmint Challenge Solution locally and interact with the features, follow the steps below:

1. Clone the repository and navigate to the project directory:

```bash
git clone <repository>
cd crossmint-challenge
```

2. Install the dependencies and launch the server

```bash
pnpm install
pnpm start
```

3. Access in browser
   Open your browser and head over to the server address, typically found at http://localhost:3000.

## 🎮 Features & Functionality

- Match: This feature allows users to replicate the Crossmint map onto our map. Simply click the Match button and watch your map transform!

- Clear: Want a fresh start? The Clear function lets you reset by removing all the comeths, soloons, and polyanets, leaving a clean slate of spaces.

## 🔧 Future Work & Improvements

Error Handling: An immediate enhancement would be the robust handling of errors from the Crossmint API. Given its restriction on the number of requests (returning error 429), implementing a mechanism to manage and inform users of these limitations would enhance the user experience.
