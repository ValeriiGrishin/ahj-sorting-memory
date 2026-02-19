const movies = [
  { id: 26, title: "Побег из Шоушенка", imdb: 9.30, year: 1994 },
  { id: 25, title: "Крёстный отец", imdb: 9.20, year: 1972 },
  { id: 27, title: "Крёстный отец 2", imdb: 9.00, year: 1974 },
  { id: 1047, title: "Тёмный рыцарь", imdb: 9.00, year: 2008 },
  { id: 223, title: "Криминальное чтиво", imdb: 8.90, year: 1994 }
];

const FIELDS = ['id', 'title', 'year', 'imdb'];

let step = 0;
let currentData = [...movies];

function renderTable(data) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach(movie => {
    const row = document.createElement('tr');
    row.dataset.id = movie.id;
    row.dataset.title = movie.title;
    row.dataset.year = movie.year;
    row.dataset.imdb = movie.imdb.toFixed(2);
    
    row.innerHTML = `
      <td>#${movie.id}</td>
      <td>${movie.title}</td>
      <td>(${movie.year})</td>
      <td>imdb: ${movie.imdb.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
  
  updateArrow();
}

function sortData(field, direction) {
  currentData.sort((a, b) => {
    if (field === 'title') {
      return direction === 'asc' 
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    }
    return direction === 'asc' 
      ? a[field] - b[field]
      : b[field] - a[field];
  });
}

function updateArrow() {
  const fieldIndex = Math.floor(step / 2) % 4;
  const field = FIELDS[fieldIndex];
  const direction = step % 2 === 0 ? 'asc' : 'desc';
  
  document.querySelectorAll('th .arrow').forEach(el => el.textContent = '');
  const th = document.querySelector(`th[data-sort="${field}"] .arrow`);
  if (th) th.textContent = direction === 'asc' ? ' ↑' : ' ↓';
}

function nextSort() {
  const fieldIndex = Math.floor(step / 2) % 4;
  const field = FIELDS[fieldIndex];
  const direction = step % 2 === 0 ? 'asc' : 'desc';
  
  sortData(field, direction);
  renderTable(currentData);
  step = (step + 1) % 8;
}

renderTable(currentData);
setInterval(nextSort, 2000);