const API='/api';
async function loadBooks(){
  const status=document.getElementById('status');
  status.textContent='Loading…';
  try{
    const q=document.getElementById('q').value.trim();
    const r=await fetch(`${API}/books?q=${encodeURIComponent(q)}`);
    if(!r.ok) throw new Error('Catalog request failed');
    const books=await r.json();
    document.getElementById('books').innerHTML=books.map(b=>`<tr><td>${escapeHtml(b.title)}</td><td>${escapeHtml(b.isbn??'')}</td><td>${Number(b.total_copies??0)}</td><td>${Number(b.available_copies??0)}</td></tr>`).join('');
    status.textContent=`${books.length} book${books.length===1?'':'s'} found`;
  }catch(e){status.textContent=e.message||'Unable to load catalog';}
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>{});
loadBooks();
