import { readable } from "svelte/store";

// TODO Make this an API call for the user preferences
const colorScheme = {
  main: {
    background: "#212121",
    lightText: "#e9d8a4",
    darkText: "#E5CC83",
    textAreaDropShadow: "4px 4px 4px 0px #00000025",
    textAreaInsetShadow: "inset 0px 0px 3px 4px #00000025",
    aquaGradient: "linear-gradient(#e068fe, #a552e2)",
  },
  sidebar: {
    background: "linear-gradient(#292929, #272727)",
    pinnedBook: "#157A6E",
    activeBook: "#693391",
    defaultBook: "",
    authorText: "#b6ac92",
    searchBox: "#414141",
    scrollThumb: "#00ffff",
    scrollBackground: "#212121",
    unlocked: "#e2d2d6",
    locked: "#272727",
    activeGradient: "linear-gradient(#e068fe, #a552e2)",
    // activeGradient: "linear-gradient(hsl(308, 58%, 88%), hsl(308, 98%, 68%))",
    pinnedGradient: "linear-gradient(#9cb07b, #59983b)",
    bookwise: "linear-gradient(to right, #53E38D, #DC66FC)",
    newbook: "#1fb3b3",
  },
  notes: {
    quote: "linear-gradient(#FEEF68, #E2A052)",
    quoteBackground: "#878259",
    thought: "linear-gradient(#9cb07b, #59983b)",
    thoughtBackground: "#6a7a4e",
    connection: "linear-gradient(#e068fe, #a552e2)",
    connectionBackground: "#785680",
    definition: "linear-gradient(#5ec2d9, #356785)",
    definitionBackground: "#586d72",
    concept: "linear-gradient(#ea72aa, #a22c52)",
    conceptBackground: "#916379",
  },
};

function colorThemeReducer() {
  let themeReducedString = Object.entries(colorScheme).reduce(
    (str, [section, values]) => {
      let stringReducedSection = sectionToColorStringReducer(values, section);
      return (str += stringReducedSection);
    },
    ""
  );
  const { subscribe } = readable(themeReducedString);
  return {
    subscribe,
  };
}

const sectionToColorStringReducer = (values, section) =>
  Object.entries(values).reduce((str, [key, value]) => {
    return (str += `--clr-${section}-${key}: ${value}; `);
  }, "");

export const theme = colorThemeReducer();
