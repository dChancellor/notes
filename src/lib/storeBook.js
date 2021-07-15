import { writable, derived } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

//TODO Make this a store for user to select which "group" of books for portfolio website - 3 groups (my actual notes, 20 books, 400 books)
import notesJSON from "../../SHORT_DATA";
import dbShort from "../../SHORT_DATA_SMALL";

//TODO This will be deleted with the DB call
let dbPins = dbShort.reduce((arr, book) => {
  if (book.pinned) arr.push(book.isbn);
  return arr;
}, []);
// TODO This will also be deleted with DB call
let dbActive = notesJSON.find((book) => book.active);
// TODO This will also be delete with the DB call
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
  };
}

export const books = getBooks();

export const filter = writable("");

function handlePins() {
  const { subscribe, set, update } = writable(dbPins);
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
        return findActive(book);
      }),
    clear: () => set(),
    reorder: (chapters) =>
      update((book) => {
        chapters.forEach((chapter, index) => {
          chapter.chapter_number = index + 1;
        });
        console.log("chapters", chapters);
        return { ...book, ...{ chapters } };
      }),
    addChapter: () =>
      update((book) =>
        book.chapters.push({
          id: uuidv4(),
          title: "",
          chapter_number: books.chapters.length + 1,
          sort_order: books.chapters.length + 1,
          summary: "",
        })
      ),
    updateChapter: () => {},
    deleteChapter: (chapterID) =>
      update((book) => {
        let chapterIndex = book.chapters.findIndex(
          (chapter) => chapter.id === chapterID
        );
        book.chapters.splice(chapterIndex, 1);
        return book;
      }),
    changeChapterOrder: (chapterID, newOrder) =>
      update((book) => {
        let chapterIndex = book.chapters.findIndex(
          (chapter) => chapter.id === chapterID
        );
        book.chapters[chapterIndex].sort_order = newOrder;
        book.chapters.sort((a, b) => a.sort_order - b.sort_order);
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
    updateNote: (chapterID, data) =>
      update((book) => {
        let chapterIndex = book.chapters.findIndex(
          (chapter) => chapter.id === chapterID
        );
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
    define: (book) => update(() => book),
  };
}
export const activeBook = handleBook();
export const editable = writable(true);

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
