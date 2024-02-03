import FiniteAutomaton from "./FiniteAutomation";
import { FiniteStateMachineConfig } from "../interface/FiniteStateMachineConfig";

function createFSM({
  states,
  alphabet,
  initialState,
  finalStates,
  transitions,
}: FiniteStateMachineConfig): (input: string) => string {
  const FSM = new FiniteAutomaton(
    states,
    alphabet,
    initialState,
    finalStates,
    new Map()
  );
  transitions.forEach(([currentState, symbol, nextState]) => {
    FSM.setTransitionFunction(currentState, symbol, nextState);
  });
  console.log(FSM);
  return (input: string) => FSM.execute(input);
}

export default createFSM;
