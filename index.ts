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
const result = modThree("1101");

console.log(result);
