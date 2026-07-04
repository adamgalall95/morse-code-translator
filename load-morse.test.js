import {
  isMorse,
  isEnglish,
  translateToMorse,
  translateToEnglish,
} from "./js/translate-functions";

import translate from "./js/translate-functions";
const morse = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  " ": "/",
};

describe("Tests the function checking morese code - isMorse", () => {
  test("returns true for valid morse", () => {
    expect(isMorse(".-- .-. .. - - . -. / -... -.-- / .- -.. .- --")).toBe(
      true,
    );
  });

  test("returns true with slash", () => {
    expect(isMorse(".-- .-. .. - - . -. / -... -.-- / .- -.. .- --")).toBe(
      true,
    );
  });

  test("ignores surrounding spaces", () => {
    expect(isMorse("   .... .   ")).toBe(true);
  });

  test("returns false for english", () => {
    expect(isMorse("HELLO")).toBe(false);
  });

  test("returns false for numbers", () => {
    expect(isMorse("123")).toBe(false);
  });

  test("returns false for mixed text", () => {
    expect(isMorse(".... HELLO")).toBe(false);
  });
});

describe("Tests the function checking English - isEnglsih", () => {
  test("returns true for valid english alphabets", () => {
    expect(isEnglish("Hi my Name is Adam")).toBe(true);
  });

  test("ignores white space for valid english", () => {
    expect(isEnglish(" Hi my Name is Adam  ")).toBe(true);
  });

  test("returns false for alphabets mixed with numbers and other characters", () => {
    expect(isEnglish(" Hi my Name is Adam  123 --.")).toBe(false);
  });

  test("returns false for morse code", () => {
    expect(isEnglish(".-- .-. .. - - . -. / -... -.-- / .- -.. .- --")).toBe(
      false,
    );
  });
});

describe("Checks the function translating Englsih to morse", () => {
  test("translates englsih to morse", () => {
    expect(
      translateToEnglish(
        ".-- .-. .. - - . -. / -... -.-- / .- -.. .- --",
        morse,
      ),
    ).toBe("WRITTEN BY ADAM");
  });
  test("Ignores white space", () => {
    expect(
      translateToEnglish(
        "   .-- .-. .. - - . -. / -... -.-- / .- -.. .- --  ",
        morse,
      ),
    ).toBe("WRITTEN BY ADAM");
  });
});

describe("translates english to morse", () => {
  test("translates morse code to english", () => {
    expect(translateToMorse("WRITTEN BY ADAM", morse)).toBe(
      ".-- .-. .. - - . -. / -... -.-- / .- -.. .- --",
    );
  });

  test("Ignores white space", () => {
    expect(translateToMorse("   WRITTEN BY ADAM ", morse)).toBe(
      ".-- .-. .. - - . -. / -... -.-- / .- -.. .- --",
    );
  });
});

describe("tests the main translate function", () => {
  test("translates english to morse", () => {
    expect(translate("WRITTEN BY ADAM", morse, "to-morse-btn")).toBe(
      ".-- .-. .. - - . -. / -... -.-- / .- -.. .- --",
    );
  });

  test("translates morse to english", () => {
    expect(
      translate(
        ".-- .-. .. - - . -. / -... -.-- / .- -.. .- --",
        morse,
        "to-english-btn",
      ),
    ).toBe("WRITTEN BY ADAM");
  });

  test("returns undefined for invalid input", () => {
    expect(translate("123", morse, "to-morse-btn")).toBeUndefined();
  });

  test("returns undefined for an invalid button id", () => {
    expect(translate("WRITTEN BY ADAM", morse, "invalid-btn")).toBeUndefined();
  });
});
