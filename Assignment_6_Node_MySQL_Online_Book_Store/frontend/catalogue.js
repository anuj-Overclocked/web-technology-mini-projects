const bookGrid = document.querySelector('#book-grid');
const statusMessage = document.querySelector('#catalogue-status');
const searchInput = document.querySelector('#search');
const categorySelect = document.querySelector('#category');
let books = [];

function renderBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
    return matchesSearch && (category === 'all' || book.category === category);
  });

  if (filteredBooks.length === 0) {
    bookGrid.innerHTML = '<div class="empty-state"><h3>No books found</h3><p>Try another title, author, or category.</p></div>';
    statusMessage.textContent = '';
    return;
  }
  statusMessage.textContent = `${filteredBooks.length} book${filteredBooks.length === 1 ? '' : 's'} to explore`;
  bookGrid.innerHTML = filteredBooks.map((book) => `
    <article class="book-card">
      <img class="book-cover" src="${book.imageUrl}" alt="Cover of ${escapeHtml(book.title)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80'">
      <div class="book-info"><span class="book-category">${escapeHtml(book.category)}</span><h2 class="book-title">${escapeHtml(book.title)}</h2><p class="book-author">by ${escapeHtml(book.author)}</p><p class="book-description">${escapeHtml(book.description)}</p><div class="book-bottom"><span class="book-price">$${Number(book.price).toFixed(2)}</span><button class="details-button" data-book-id="${book.id}">View details →</button></div></div>
    </article>`).join('');

  bookGrid.querySelectorAll('.details-button').forEach((button) => {
    button.addEventListener('click', () => showBookDetails(button.dataset.bookId));
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

async function showBookDetails(bookId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`);
    const book = await response.json();
    if (!response.ok) throw new Error(book.message || 'Book details unavailable.');
    window.alert(`${book.title}\n\nBy ${book.author}\n${book.category} | $${Number(book.price).toFixed(2)}\n\n${book.description}`);
  } catch (error) {
    window.alert(error.message || 'Book details could not be loaded.');
  }
}

async function loadBooks() {
  statusMessage.textContent = 'Loading books...';
  try {
    const response = await fetch(`${API_BASE_URL}/api/books`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Catalogue could not be loaded.');
    books = Array.isArray(result) ? result : [];
    renderBooks();
  } catch (error) {
    bookGrid.innerHTML = '<div class="empty-state"><h3>Catalogue unavailable</h3><p>Please check that the backend and database are running, then refresh.</p></div>';
    statusMessage.textContent = error.message || 'Unable to load books.';
  }
}

searchInput.addEventListener('input', renderBooks);
categorySelect.addEventListener('change', renderBooks);
loadBooks();
