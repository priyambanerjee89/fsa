import { isBinary } from "../helpers";

class FiniteStateMachine {
  private states: Set<string>;
  private alphabet: Set<string>;
  private initialState: string;
  private finalStates: Set<string>;
  private transitionFunction: Map<string, Map<string, string>>;

  constructor(
    states: string[],
    alphabet: string[],
    initialState: string,
    finalStates: string[]
  ) {
    this.states = new Set(states);
    this.alphabet = new Set(alphabet);
    this.initialState = initialState;
    this.finalStates = new Set(finalStates);
    this.transitionFunction = new Map();
  }

  public setTransitionFunction(
    currentState: string,
    symbol: string,
    nextState: string
  ): void {
    if (!this.transitionFunction.has(currentState)) {
      this.transitionFunction.set(currentState, new Map());
    }
    this.transitionFunction.get(currentState)?.set(symbol, nextState);
  }

  public execute(input: string): string {
    if (!isBinary(input)) {
      throw new Error(
        "The input is not valid binary. Check that the input has no spaces and only contains 0s and 1s."
      );
    }

    // check if state is in the set of states
    if (!this.states.has(this.initialState)) {
      throw new Error(
        `The intial state '${this.initialState}' is not in the set of states.`
      );
    }

    let currentState = this.initialState;

    for (let char of input) {
      // redundant check since we'll only test with binary numbers
      // and isBinary helper checks for this but added it for completeness
      if (!this.alphabet.has(char)) {
        throw new Error(`The character '${char}' is not in the alphabet.`);
      }

      currentState = this.transitionFunction.get(currentState)?.get(char)!;
    }

    if (!currentState || currentState === "undefined") {
      throw new Error(
        `The transition function was not set correctly. Check that you have transitions for every symbol in the alphabet.`
      );
    }

    if (!this.finalStates.has(currentState)) {
      throw new Error(
        `The state '${currentState}' is not in the list of final states.`
      );
    }
    return `${currentState} = ${currentState.slice(-1)}`;
  }
}

export default FiniteStateMachine;
