import { get, readable, writable } from "svelte/store";
import { api, settings } from "./config";
import { v4 as uuidv4 } from "uuid";

function colorTheme() {
  let { colorScheme } = settings;
  // Writes string with all color variables from config file
  let res = Object.entries(colorScheme.samwise).reduce(
    (str, [section, value]) => {
      let themeSection = Object.entries(value).reduce((str, [key, value]) => {
        return (str += `--${section}-${key}: ${value}; `);
      }, "");
      return (str += themeSection);
    },
    ""
  );
  const { subscribe, set, update } = writable(res);

  return {
    subscribe,
    set: () => set(colorScheme.samwise),
  };
}

export const theme = colorTheme();

// export const test = readable([], async function start(set) {
//     const {data, error} = await getBooks(api.url)
// let pinned = data.find((book) => book.pinned === true)

//     if(error) console.error(error.message);
//     set(data)
//     return function stop() {
//         console.log('stop that');
//     }
// } )

// async function getBooks(url){
//     return await fetch(url).then((res) => res.json()).catch((message) => {return {error:message }})
// }

// DELETE THIS BLOCK

// Add this to the database and grab with the API call
let { colorScheme } = settings;

// import data from '../example-data'
// import data from "../../MOCK_DATA";
import data from '../../SHORT_DATA'

export const books = readable(data, async function start(set) {
  let savedPins = data.filter((book) => book.pinned === true);
  let lastActive = data.find((book) => book.active === true);
  set({ data, savedPins, lastActive });
  return function stop() {};
});

// END BLOCK

function handleBook() {
  const { subscribe, set, update } = writable();

  return {
    subscribe,
    pin: (book) => update((pins) => [...pins, book]),
    unpin: (isbn) =>
      update((pins) => {
        let find = pins.findIndex((pin) => pin.isbn === isbn);
        if (find != -1) pins.splice(find, 1);
        return pins;
      }),
    deleteChapter: (chapterID) =>
      update((book) => {
        let chapterIndex = book.chapters.findIndex(
          (chapter) => chapter.id === chapterID
        );
        book.chapters.splice(chapterIndex, 1);
        return book;
      }),
    updateNote: (chapterID, data) =>
      update((book) => {
        let chapterIndex = book.chapters.findIndex(
          (chapter) => chapter.id === chapterID
        );
        return book;
      }),
    addNote: (chapterID, type) =>
      update((book) => {
        let chapterIndex = book.chapters.findIndex(
          (chapter) => chapter.id === chapterID
        );
        book.chapters[chapterIndex].notes.push({
          note_type: type,
          id: uuidv4(),
          content: "",
          page_number: 0,
        });
        return book;
      }),
    deleteNote: (chapterID, noteID) =>
      update((book) => {
        let chapterIndex = book.chapters.findIndex(
          (chapter) => chapter.id === chapterID
        );
        let noteIndex = book.chapters[chapterIndex].notes.findIndex(
          (note) => note.id === noteID
        );
        book.chapters[chapterIndex].notes.splice(noteIndex, 1);
        return book;
      }),
    activate: (book) => update(() => book),
    define: (book) => update(() => book),
    reset: () => set(),
  };
}

export const pinnedBooks = handleBook();
export const activeBook = handleBook();

function modal() {
  const { subscribe, update } = writable({ show: false });
  return {
    subscribe,
    confirm: () => {
      update((instance) => {
        instance.callback();
        return { show: false, type: null, callback: null };
      });
    },
    showModal: (type, callback) =>
      update(() => {
        return { type, callback, show: true };
      }),
    hideModal: () =>
      update(() => {
        return { type: null, callback: null, show: false };
      }),
  };
}

export const deleteThis = modal();
