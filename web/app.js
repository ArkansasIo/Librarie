const API = '/api';
async function loadBooks(){
  const q=document.getElementById('q').value;
  const r=await fetch(`${API}/books?q=${encodeURIComponent(q)}`);
  const books=await r.json();
  document.getElementById('books').innerHTML=books.map(b=>`<tr><td>${escapeHtml(b.title)}</td><td>${escapeHtml(b.isbn??'')}</td><td>${b.total_copies??0}</td><td>${b.available_copies??0}</td></tr>`).join('');
}
function escapeHtml(v){return String(v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\\':'&#39;'}[c]));}
loadBooks();
