// TODO - Refactor for finding indexes in a more performant & universal way

import { writable, derived } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

import notesJSON from "../../SHORT_DATA";
import dbShort from "../../SHORT_DATA_SMALL";
// import dbLong from "../../LONG_DATA";
// import dbPersonal from "../../PERSONAL_DATA";

// REVIEW This will be deleted with the DB call
let dbPins = dbShort.reduce((arr, book) => {
  if (book.pinned) arr.push(book.isbn);
  return arr;
}, []);
//  REVIEW This will also be deleted with DB call
let dbActive = notesJSON.find((book) => book.active);
//  REVIEW This will also be delete with the DB call
let findActive = (book) => notesJSON.find(({ isbn }) => isbn === book.isbn);

const syncDB = {
  create: (book, message) => console.log(message, book),
  update: (book, message) => console.log(message, book),
  delete: (book, message) => console.log(message, book),
};

function getBooks() {
  const { subscribe, update } = writable(dbShort);
  return {
    subscribe,
    addNew: (newBook) => {
      // TODO - lots to do here...
      syncDB.create(
        newBook,
        "This will add a new book w/ authors to db for this book =>"
      );
      update((books) => [...books, newBook]);
    },
    remove: (isbn) =>
      update((books) => {
        let index = books.findIndex((book) => book.isbn === isbn);
        books.splice(index, 1);
        return books;
      }),
    // REVIEW This will be deleted in production
    // TODO Set this to varying fetch calls so user doesn't need to download all 3 JSON on initial load
    // TODO Set up a Mongo DB to catch X amount of books || those tagged with my actual notes
    swap: (input) =>
      update(() => {
        switch (input) {
          case "short":
            return dbShort;
          case "long":
          // return dbLong;
          case "personal":
          // return dbPersonal;
        }
      }),
  };
}

export const books = getBooks();

export const filter = writable("");

function handlePins() {
  const { subscribe, update } = writable(dbPins);
  return {
    subscribe,
    add: (book) => {
      book.pinned = true;
      syncDB.update(book, "This should add pin=true to db for this book => ");
      update((pins) => [...pins, book.isbn]);
    },
    remove: (book) => {
      book.pinned = false;
      syncDB.update(
        book,
        "This should remove pin=true from db for this book =>"
      );
      update((pins) => {
        let bookIndex = pins.findIndex((pin) => pin === book.isbn);
        pins.splice(bookIndex, 1);
        return pins;
      });
    },
  };
}

export const pins = handlePins();

function handleBook() {
  const { subscribe, set, update } = writable(dbActive);
  return {
    subscribe,
    set,
    save: () =>
      update((book) => {
        syncDB.update(book, "This should save this book => ");
        return book;
      }),
    activate: (book) =>
      update((oldBook) => {
        if (oldBook) {
          syncDB.update(
            oldBook,
            "This should remove active status from db for this OLD book => "
          );
          oldBook.active = false;
        }
        syncDB.update(
          book,
          "This should retrieve the new book && update active status via a RETURN statement for this book =>"
        );
        // TODO - Change this to get from MongoDB
        return findActive(book);
      }),
    clear: () => set(),
    reorder: (chapters) =>
      update((book) => {
        chapters.forEach((chapter, index) => {
          chapter.chapter_number = index + 1;
        });
        return { ...book, ...{ chapters } };
      }),
    addChapter: () =>
      update((book) => {
        book.chapters.push({
          id: uuidv4(),
          title: "",
          chapter_number: book.chapters.length + 1,
          summary: "",
          notes: [],
        });
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
    deleteBook: (isbn) =>
      update((book) => {
        syncDB.delete(isbn, "This will delete this book from the db =>");
        return null;
      }),
    deleteChapter: (chapterID) =>
      update((book) => {
        let chapterIndex = book.chapters.findIndex(
          (chapter) => chapter.id === chapterID
        );
        book.chapters.splice(chapterIndex, 1);
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
  };
}
export const activeBook = handleBook();
export const editable = writable(false);

export const filtered = derived(
  [books, filter, activeBook, pins],
  ([$books, $filter, $activeBook, $pins]) => {
    if ($filter.length === 0) return $books;
    return $books.filter(
      (book) =>
        book.isbn === $activeBook?.isbn ||
        $pins.includes(book.isbn) ||
        book.title.toLowerCase().startsWith($filter.toLowerCase())
    );
  }
);
