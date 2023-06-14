
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
 
 
//-----------------------------------------------------------------------------------------------
/**
 * Represents a book renderer that displays book previews, genre options, and author options.
 */
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

class BookRenderer extends HTMLElement {
  constructor() {
    super();

    this.matches = matches;
    this.page = 1;
    this.BOOKS_PER_PAGE = 36;
    this.genres = genres;
    this.authors = authors;
  }

  connectedCallback() {
    this.render();
  }

  get Matches() {
    return this.matches;
  }

  set Matches(matches) {
    this.matches = matches;
    this.renderBookPreviews();
  }

  get Page() {
    return this.page;
  }

  set Page(page) {
    this.page = page;
    this.renderBookPreviews();
  }

  get Genres() {
    return this.genres;
  }

  set Genres(genres) {
    this.genres = genres;
    this.appendGenreOptions();
  }

  get Authors() {
    return this.authors;
  }

  set Authors(authors) {
    this.authors = authors;
    this.appendAuthorOptions();
  }

  render() {
    this.renderBookPreviews();
    this.appendGenreOptions();
    this.appendAuthorOptions();
  }

  renderBookPreviews() {
    // Clear existing book previews
    this.innerHTML = '';

    // Get the book previews for the current page
    const bookPreviews = this.matches
      .slice((this.page - 1) * this.BOOKS_PER_PAGE, this.page * this.BOOKS_PER_PAGE)
      .map(this.createPreviewElement);

    // Append each preview element to the component
    bookPreviews.forEach((preview) => {
      this.appendChild(preview);
    });
  }

  createPreviewElement(match) {
    // Create and return a preview element based on the match
    const preview = document.createElement('div');
    preview.textContent = match.title
    return preview;
  }

  appendGenreOptions() {
    const genreHtml = this.createOptionsFragment(this.genres, 'All Genres');
    this.querySelector('[data-search-genres]').innerHTML = '';
    this.querySelector('[data-search-genres]').appendChild(genreHtml);
  }

  appendAuthorOptions() {
    const authorsHtml = this.createOptionsFragment(this.authors, 'All Authors');
    this.querySelector('[data-search-authors]').innerHTML = '';
    this.querySelector('[data-search-authors]').appendChild(authorsHtml);
  }

  createOptionsFragment(data, defaultOptionText) {
    const fragment = document.createDocumentFragment();
    const firstElement = document.createElement('option');
    firstElement.value = 'any';
    firstElement.innerText = defaultOptionText;
    fragment.appendChild(firstElement);

    for (const [id, name] of Object.entries(data)) {
      const element = document.createElement('option');
      element.value = id;
      element.innerText = name;
      fragment.appendChild(element);
    }
    return fragment;
  }
}

customElements.define('book-renderer', BookRenderer);


//----------------------------------------------------------------------------------------
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