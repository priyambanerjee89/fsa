import { FiniteStateMachineConfig } from "../interface/FiniteStateMachineConfig";
import FiniteStateMachine from "./FiniteStateMachine";

function createFSM(
  config: FiniteStateMachineConfig
): (input: string) => string {
  const { states, alphabet, initialState, finalStates, transitions } = config;

  const FSM = new FiniteStateMachine(
    states,
    alphabet,
    initialState,
    finalStates
  );

  transitions.forEach(([currentState, symbol, nextState]) => {
    FSM.setTransitionFunction(currentState, symbol, nextState);
  });

  return (input: string) => FSM.execute(input);
}

export default createFSM;
