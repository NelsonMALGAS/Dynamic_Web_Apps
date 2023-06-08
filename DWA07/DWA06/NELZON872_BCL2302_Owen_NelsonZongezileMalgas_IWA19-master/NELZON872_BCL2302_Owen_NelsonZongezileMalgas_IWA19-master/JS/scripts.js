/*
  A HIGHER-ORDER FUNCTION is a function that can accept other functions as
  arguments or return functions as results. In other words, it treats functions
  as first-class citizens, allowing them to be manipulated and passed around
  like any other value.
*/

/*
   ABSTRACTION is a fundamental concept in computer science and programming that
   involves simplifying complex systems by focusing on essential features while
   hiding unnecessary details. It is the process of representing something in a
   simplified manner, making it easier to understand and work with.
 */


   // I mainly used Structured / Procedural programming
   
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books;

const starting = document.createDocumentFragment();
/**
 * This is the function that creates the books that have titles, genres ,id and images to appear on the HTML document
 * @param {'any'} book 
 * @returns {element} 
 */
const createPreviewElement =(book) => {
  const { author, id, image, title } = book;
  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);

  const imageElement = document.createElement('img');
  imageElement.classList = 'preview__image';
  imageElement.src = image;

  const infoElement = document.createElement('div');
  infoElement.classList = 'preview__info';

  const titleElement = document.createElement('h3');
  titleElement.classList = 'preview__title';
  titleElement.textContent = title;

  const authorElement = document.createElement('div');
  authorElement.classList = 'preview__author';
  authorElement.textContent = authors[author];

  infoElement.appendChild(titleElement);
  infoElement.appendChild(authorElement);

  element.appendChild(imageElement);
  element.appendChild(infoElement);

  return element;
}

/**
 * Renders book previews based on the current page and matches array.
 * Uses the createPreviewElement function to generate the preview elements.
 */
const renderBookPreviews = () => {
    // Get the book previews for the current page
    const bookPreviews = matches
      .slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE)
      .map(createPreviewElement);
  
    // Append each preview element to the 'starting' container
    bookPreviews.forEach((preview) => {
      starting.appendChild(preview);
    });
  
    // Append the 'starting' container to the 'data-list-items' container
    document.querySelector('[data-list-items]').appendChild(starting);
  }
  
  // Call the renderBookPreviews function to display the book previews
  renderBookPreviews();
  

//---------------------------------------------------------------------------------

/**
 * This is a function that create the options fragments
 * @param {string} data - This will replace the {@link defaultOptionText} that already exists after user input
 * @param {string} defaultOptionText - This is the default text that will show if {@link data} is not yet created
 * @returns {fragment} 
 */

const createOptionsFragment = (data, defaultOptionText) => {
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
  
  const genreHtml = createOptionsFragment(genres, 'All Genres');
  document.querySelector('[data-search-genres]').appendChild(genreHtml);
  
  const authorsHtml = createOptionsFragment(authors, 'All Authors');
  document.querySelector('[data-search-authors]').appendChild(authorsHtml);

  //-----------------------------------------------------------------------------------------------------------

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

    document.querySelector('[data-list-button]').addEventListener('click', () => {
        
        remainingBooks -= 36;
        updateRemainingBooksCount();
      });
      
  }
  
  updateRemainingBooksCount();

  //---------------------------------------------------------------------------
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
  
/**
 * This function waits for the user to select either 'day' or 'night' and changes the theme based on user input
 * @param {string} theme 
 */

const updateTheme = (theme) => {
    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
}

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
   * Displays an error message if there are no matching books, or hides the message if there are matches.
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



/**
 * This function creates the book preview element to display 
 * on the HTML document every time the {@link element}  is clicked.
 *
 * @param {Object} book - The book object containing details.
 * @param {string} book.author - The writer of the book.
 * @param {string} book.id - The ID of the book.
 * @param {string} book.image - The image URL of the book.
 * @param {string} book.title - The title of the book.
 * @returns {Element} 
 */

const createBookPreview = (book) => {
  const { author, id, image, title } = book  // Now i actually passed the book as argument. 1
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

    return element;
}

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
