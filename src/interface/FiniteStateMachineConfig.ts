export interface FiniteStateMachineConfig {
  states: string[];
  alphabet: string[];
  initialState: string;
  finalStates: string[];
  transitions: [string, string, string][];
}
