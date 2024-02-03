# Finite State Machine Generator

Module for generating an Finite State Machine (FSM) using Typescript

## Installation

`npm install`

## Build

`npm run build`

## Run

`npm run start`

## Test

`npm run test`

## Usage

#### **`index.ts`**

```
import createFSM from "./src/lib/createFSM";
import { FiniteStateMachineConfig } from "./src/interface/FiniteStateMachineConfig";

// create a configuration object for FSM
const modThreeConfig: FiniteStateMachineConfig = {
  states: ["S0", "S1", "S2"],
  alphabet: ["0", "1"],
  initialState: "S0",
  finalStates: ["S0", "S1", "S2"],
  transitions: [
    ["S0", "0", "S0"],
    ["S0", "1", "S1"],
    ["S1", "0", "S2"],
    ["S1", "1", "S0"],
    ["S2", "0", "S1"],
    ["S2", "1", "S2"],
  ],
};

// create a FSM using the configuration object
const modThree = createFSM(modThreeConfig);

// execute the FSM with an input
const result = modThree("1100");
```

## Rebuild

Rebuild app if changes are made in **`index.ts`** or **`createFSM.test`**

To rebuild: `npm run build`

To rerun **`index.ts`**

`npm run start`

## Note

Did not do any additional handling for leading zeros. Assumed intitial transition would always be [S0, 0, S0]

Assumed final state would always have the form S(N) = N, ie S0 = 0, S1 = 1, S2 = 2 etc.
