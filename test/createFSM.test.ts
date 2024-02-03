import createFSM from "../src/lib/createFSM";

describe("createFSM", () => {
  it("should return the expected output for valid inputs", () => {
    const modThree = createFSM({
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
    });

    expect(modThree("1101")).toBe("S1 = 1");
    expect(modThree("1110")).toBe("S2 = 2");
    expect(modThree("1111")).toBe("S0 = 0");

    const modFour = createFSM({
      states: ["S0", "S1", "S2", "S3"],
      alphabet: ["0", "1"],
      initialState: "S0",
      finalStates: ["S0", "S1", "S2", "S3"],
      transitions: [
        ["S0", "0", "S0"],
        ["S0", "1", "S1"],
        ["S1", "0", "S2"],
        ["S1", "1", "S3"],
        ["S2", "0", "S0"],
        ["S2", "1", "S1"],
        ["S3", "0", "S2"],
        ["S3", "1", "S3"],
      ],
    });

    expect(modFour("1101")).toBe("S1 = 1");
    expect(modFour("1110")).toBe("S2 = 2");
    expect(modFour("1111")).toBe("S3 = 3");
  });

  it("should throw an error for non binary inputs", () => {
    const modFourError = createFSM({
      states: ["S0", "S1", "S2", "S3"],
      alphabet: ["0", "1"],
      initialState: "S0",
      finalStates: ["S0", "S1", "S2", "S3"],
      transitions: [
        ["S0", "0", "S0"],
        ["S0", "1", "S1"],
        ["S1", "0", "S2"],
        ["S1", "1", "S3"],
        ["S2", "0", "S0"],
        ["S2", "1", "S1"],
        ["S3", "0", "S2"],
        ["S3", "1", "S3"],
      ],
    });

    expect(() => {
      modFourError("ba");
    }).toThrow(
      "The input is not valid binary. Check that the input has no spaces and only contains 0s and 1s."
    );
  });

  it("should throw an error for invalid initial state", () => {
    const modFourError = createFSM({
      states: ["S0", "S1", "S2", "S3"],
      alphabet: ["0", "1"],
      initialState: "S4",
      finalStates: ["S0", "S1", "S2", "S3"],
      transitions: [
        ["S0", "0", "S0"],
        ["S0", "1", "S1"],
        ["S1", "0", "S2"],
        ["S1", "1", "S3"],
        ["S2", "0", "S0"],
        ["S2", "1", "S1"],
        ["S3", "0", "S2"],
        ["S3", "1", "S3"],
      ],
    });

    expect(() => {
      modFourError("1101");
    }).toThrow("The intial state 'S4' is not in the set of states.");
  });

  it("should throw an error for invalid final state", () => {
    const modFourError = createFSM({
      states: ["S0", "S1", "S2", "S3"],
      alphabet: ["0", "1"],
      initialState: "S0",
      finalStates: ["S0"],
      transitions: [
        ["S0", "0", "S0"],
        ["S0", "1", "S1"],
        ["S1", "0", "S2"],
        ["S1", "1", "S3"],
        ["S2", "0", "S0"],
        ["S2", "1", "S1"],
        ["S3", "0", "S2"],
        ["S3", "1", "S3"],
      ],
    });

    expect(() => {
      modFourError("1101");
    }).toThrow("The state 'S1' is not in the list of final states.");
  });

  it("should set the transition function correctly", () => {
    const modFourMissingTransitions = createFSM({
      states: ["S0", "S1", "S2", "S3"],
      alphabet: ["0", "1"],
      initialState: "S0",
      finalStates: ["S0", "S1", "S2", "S3"],
      transitions: [
        ["S0", "0", "S0"],
        ["S1", "1", "S3"],
        ["S2", "0", "S0"],
        ["S3", "0", "S2"],
      ],
    });

    expect(() => {
      modFourMissingTransitions("1101");
    }).toThrow(
      "The transition function was not set correctly. Check that you have transitions for every symbol in the alphabet."
    );
  });
});
