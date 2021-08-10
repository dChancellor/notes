import { quartOut } from "svelte/easing";

export const noteTypes = [
  { name: "Quote", helper: "A direct quote from the book" },
  {
    name: "Thought",
    helper: "A random thought - this is a bit of a catch-all",
  },
  {
    name: "Connection",
    helper:
      "A connection to another work - book, movie, etc. Leave a reference",
  },
  { name: "Definition", helper: "A definition of a term, word or concept" },
  {
    name: "Concept",
    helper:
      "These are broad umbrella understandings of the lit, a more nebulous summary of a theory/proposal/explanation in my own words",
  },
];