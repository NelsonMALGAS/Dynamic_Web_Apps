
/*
   ABSTRACTION is a fundamental concept in computer science and programming that
   involves simplifying complex systems by focusing on essential features while
   hiding unnecessary details. It is the process of representing something in a
   simplified manner, making it easier to understand and work with.
 */

/*
 A FACTORY FUNCTION is a design pattern in JavaScript that allows you to create
 and return new objects with a consistent structure. It acts as a factory for
 creating objects of a specific type, providing a way to encapsulate object
 creation logic and customize object initialization.
 */

 
 import { 
  books,
  authors,
  genres,
  BOOKS_PER_PAGE,
  createPreviewElement,
  createOptionsFragment,
  updateTheme,
  createBookPreview
 } from './data.js'

 let page = 1;
 let matches = books;


/**
 * Represents a book renderer that displays book previews, genre options, and author options.
//  */
// class CreateBookRenderer  {

//    /**
//    * Create a new instance of CreateBookRenderer.
//    * @param {Array} matches - The array of book matches.
//    * @param {number} page - The current page number.
//    * @param {number} BOOKS_PER_PAGE - The number of books to display per page.
//    * @param {Object} genres - The object of available genres.
//    * @param {Object} authors - The object of available authors.
//    */

//   constructor(matches, page, BOOKS_PER_PAGE, genres, authors) {
//     this.matches = matches;
//     this.page = page;
//     this.BOOKS_PER_PAGE = BOOKS_PER_PAGE;
//     this.genres = genres;
//     this.authors = authors;

//   }

//   /**
//    * Renders book previews based on the current page and matches array.
//    * Uses the createPreviewElement function to generate the preview elements.
//    */
//   renderBookPreviews() {
//     // Get the book previews for the current page
    
//     const bookPreviews = this.matches
//       .slice((this.page - 1) * this.BOOKS_PER_PAGE, this.page * this.BOOKS_PER_PAGE)
//       .map(createPreviewElement);

//     // Append each preview element to the 'starting' container
//     bookPreviews.forEach((preview) => {
//       document.querySelector('[data-list-items]').appendChild(preview);
//     });
//   }

//   /**
//    * Appends genre options to the DOM.
//    */
//   appendGenreOptions() {
//     const genreHtml = createOptionsFragment(this.genres, 'All Genres');
//     document.querySelector('[data-search-genres]').appendChild(genreHtml);
//   }

//   /**
//    * Appends author options to the DOM.
//    */
//   appendAuthorOptions() {
//     const authorsHtml = createOptionsFragment(this.authors, 'All Authors');
//     document.querySelector('[data-search-authors]').appendChild(authorsHtml);
//   }
// }

// const renderer = new CreateBookRenderer(matches, page, BOOKS_PER_PAGE, genres, authors);
// renderer.renderBookPreviews();
// renderer.appendGenreOptions();
// renderer.appendAuthorOptions();


class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.book = null;
  }

  connectedCallback() {
    this.render();
  }

  /**
   * @param {any} book
   */
  set bookData(book) {
    this.book = book;
    this.render();
  }

  render() {
    if (!this.book) {
      this.innerHTML = '';
      return;
    }

    const { author, id, image, title } = this.book;

    this.innerHTML = `
      <div class="preview" data-preview="${id}">
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('book-preview', BookPreview);

class CreateBookRenderer extends HTMLElement {
  constructor() {
    super();
    this.matches = null;
    this.page = null;
    this.BOOKS_PER_PAGE = null;
    this.genres = null;
    this.authors = null;
  }

  connectedCallback() {
    this.renderBookPreviews();
    this.appendGenreOptions();
    this.appendAuthorOptions();
  }

  renderBookPreviews() {
    const { matches, page, BOOKS_PER_PAGE } = this;
    const bookPreviews = matches
      .slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE)
      .map((book) => {
        const preview = document.createElement('book-preview');
        preview.bookData = book;
        return preview;
      });

    bookPreviews.forEach((preview) => {
      this.appendChild(preview);
    });
  }

  appendGenreOptions() {
    const { genres } = this;
    const genreDropdown = document.createElement('select');
    genreDropdown.classList.add('genre-dropdown');

    // Create an option for "All Genres"
    const allGenresOption = document.createElement('option');
    allGenresOption.value = '';
    allGenresOption.text = 'All Genres';
    genreDropdown.appendChild(allGenresOption);

    // Create options for each genre
    Object.entries(genres).forEach(([genreId, genreName]) => {
      genreId = genres[this.id]
      const option = document.createElement('option');
      option.value = genreId;
      option.text = genreName;
      genreDropdown.appendChild(option);
    });

    this.appendChild(genreDropdown);
  }

  appendAuthorOptions() {
    const { authors } = this;
    const authorDropdown = document.createElement('select');
    authorDropdown.classList.add('author-dropdown');

    // Create an option for "All Authors"
    const allAuthorsOption = document.createElement('option');
    allAuthorsOption.value = '';
    allAuthorsOption.text = 'All Authors';
    authorDropdown.appendChild(allAuthorsOption);

    // Create options for each author
    Object.entries(authors).forEach(([authorId, authorName]) => {
      const option = document.createElement('option');
      option.value = authorId;
      option.text = authorName;
      authorDropdown.appendChild(option);
    });

    this.appendChild(authorDropdown);
  }
}

customElements.define('create-book-renderer', CreateBookRenderer);

const renderer = new CreateBookRenderer();
renderer.matches = matches;
renderer.page = page;
renderer.BOOKS_PER_PAGE = BOOKS_PER_PAGE;
renderer.genres = genres;
renderer.authors = authors;

document.querySelector('[data-list-items]').appendChild(renderer);


 /**
  * This function updates the number of books remaining when the showMore button
  * is clicked.remaining books decrements by 36
  */
 const updateRemainingBooksCount = () => {
     let remainingBooks = books.length - (page * BOOKS_PER_PAGE);
     const listButtonElement = document.querySelector('[data-list-button]');
   
     listButtonElement.innerText = `Show more (${remainingBooks})`;
     listButtonElement.enabled = remainingBooks > 0;
   
     listButtonElement.innerHTML = `
       <span>Show more</span>
       <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
     `;
    
     listButtonElement.addEventListener('click', () => {
         
         remainingBooks -= 36;
         updateRemainingBooksCount();
       });
       
   }
   
   updateRemainingBooksCount();
 

 /**
  * This function is responsible for  the overlay functionality and will be initialized,
  * setting up the event listeners and their corresponding actions. The
  * encapsulation helps keep the code contained and can be easily reused or
  * invoked when needed.
  */
 const initializeOverlayFunctionality = () => {
     const searchOverlay = document.querySelector('[data-search-overlay]');
     const settingsOverlay = document.querySelector('[data-settings-overlay]');
     const searchCancel = document.querySelector('[data-search-cancel]');
     const settingsCancel = document.querySelector('[data-settings-cancel]');
     const headerSearch = document.querySelector('[data-header-search]');
     const headerSettings = document.querySelector('[data-header-settings]');
     const listClose = document.querySelector('[data-list-close]');
     const searchTitle = document.querySelector('[data-search-title]');
     const listActive = document.querySelector('[data-list-active]');
   
     searchCancel.addEventListener('click', () => {
       closeOverlay(searchOverlay);
     });
   
     settingsCancel.addEventListener('click', () => {
       closeOverlay(settingsOverlay);
     });
   
     headerSearch.addEventListener('click', () => {
       openOverlay(searchOverlay);
       focusElement(searchTitle);
     });
   
     headerSettings.addEventListener('click', () => {
       openOverlay(settingsOverlay);
     });
   
     listClose.addEventListener('click', () => {
       closeOverlay(listActive);
     });
   /**
    * This function opens overlays
    * @param {overlay} overlay 
    */
     function openOverlay(overlay) {
       overlay.open = true;
     }
   /**
    * This function closes overlays
    * @param {overlay} overlay 
    */
     function closeOverlay(overlay) {
       overlay.open = false;
     }
    /**
     * This function puts focus on elements
     * @param {element} element 
     */
     function focusElement(element) {
       element.focus();
     }
   }
   
   // Call the function to initialize the overlay functionality
   initializeOverlayFunctionality();

 
 document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
     event.preventDefault();
     const formData = new FormData(event.target);
     const { theme } = Object.fromEntries(formData);
     updateTheme(theme);
     document.querySelector('[data-settings-overlay]').open = false;
 });
 
 const form = document.querySelector('[data-search-form]')
 
 /**
  * Handles the form submission event and performs filtering and rendering of books.
  * @param {Event} event - The submit event object.
  */
 form.addEventListener('submit', (event) => {
   event.preventDefault();
   const formData = new FormData(event.target);
   const filters = Object.fromEntries(formData);
   const result = [];
 
   for (const book of books) {
     let genreMatch = filters.genre === 'any';
 
     for (const singleGenre of book.genres) {
       if (genreMatch) break;
       if (singleGenre === filters.genre) {
         genreMatch = true;
       }
     }
 
     if (
       (filters.title.trim() === '' ||
         book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
       (filters.author === 'any' || book.author === filters.author) &&
       genreMatch
     ) {
       result.push(book);
     }
   }
 
   page = 1;
   matches = result;
 
   /**
    * This is the message that will be displayed if there are no matching books
    */
   const errorMessage = () => {
     const listMessage = document.querySelector('[data-list-message]');
     if (result.length < 1) {
       listMessage.classList.add('list__message_show');
     } else {
       listMessage.classList.remove('list__message_show');
     }
   };
 
   errorMessage();
 
   /**
    * Generates and inserts HTML elements for the filtered books.
    */
   const newHtmlItems = () => {
     document.querySelector('[data-list-items]').innerHTML = '';
     const newItems = document.createDocumentFragment();
 
     for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
       const element = document.createElement('button');
       element.classList = 'preview';
       element.setAttribute('data-preview', id);
 
       element.innerHTML = `
         <img
           class="preview__image"
           src="${image}"
         />
             
         <div class="preview__info">
           <h3 class="preview__title">${title}</h3>
           <div class="preview__author">${authors[author]}</div>
         </div>
       `;
 
       newItems.appendChild(element);
     }
 
     document.querySelector('[data-list-items]').appendChild(newItems);
   };
 
   newHtmlItems();
 
   document.querySelector('[data-list-button]').disabled =
     matches.length - page * BOOKS_PER_PAGE < 1;
 
   window.scrollTo({ top: 0, behavior: 'smooth' });
   document.querySelector('[data-search-overlay]').open = false;
 });
 

 const dataListButton = document.querySelector('[data-list-button]')
 
 
 dataListButton.addEventListener('click', () => {
     const fragment = document.createDocumentFragment();
 
     const booksPerPage = matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE);
     for (const book of booksPerPage) {
         const preview = createBookPreview(book);
         fragment.appendChild(preview);
     }
 
     document.querySelector('[data-list-items]').appendChild(fragment);
     page += 1;
 });
 
 
 /**
  * This function handles the logic of retrieving the active book based on the clicked element.
  * @param {event} event 
  * @returns {element} 
  */
 
 const getActiveBook = (event) => {
     const pathArray = Array.from(event.path || event.composedPath());
 
     for (const node of pathArray) {
         if (node?.dataset?.preview) {
             return books.find((singleBook) => singleBook.id === node.dataset.preview) || null;
         }
     }
 
     return null;
 }
 
// querySelector statements that select HTML elements based on their attribute values using CSS attribute selectors.

const listActiveOverlay =  document.querySelector('[data-list-active]')
const listActiveBlurImage = document.querySelector('[data-list-blur]')
const listActiveImage = document.querySelector('[data-list-image]')
const titleOfBook = document.querySelector('[data-list-title]')   // 2 (event listerners)
const subtitleOfBook = document.querySelector('[data-list-subtitle]')
const descriptionOfBook = document.querySelector('[data-list-description]')
const dataListItems = document.querySelector('[data-list-items]')

dataListItems.addEventListener('click', (event) => {
    /**
     * Checks if element (book) is active / clicked then it displays the clicked book information
     */
    const active = getActiveBook(event);

    if (active) {
       listActiveOverlay.open = true;
        listActiveBlurImage.src = active.image;
        listActiveImage.src = active.image;
        titleOfBook.innerText = active.title;
        subtitleOfBook.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        descriptionOfBook.innerText = active.description;
    }
});