const API='/api';
const params=new URLSearchParams(location.search);const bookId=params.get('id');
const title=document.getElementById('title'),status=document.getElementById('status'),content=document.getElementById('content');
async function load(){if(!bookId){status.textContent='No book selected.';return}try{const r=await fetch(`${API}/books/${encodeURIComponent(bookId)}/content`);if(!r.ok)throw new Error('Book content unavailable');const data=await r.json();title.textContent=data.title||'Reader';if(data.html){content.innerHTML=data.html}else if(data.text){content.textContent=data.text}else if(data.url){content.innerHTML=`<iframe title="Book" src="${escapeHtml(data.url)}" style="width:100%;height:80vh;border:0"></iframe>`}else throw new Error('No readable format found');status.textContent='Ready to read.'}catch(e){status.textContent=e.message||'Unable to load book.'}}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
document.getElementById('smaller').onclick=()=>content.style.fontSize=`${Math.max(14,(parseFloat(getComputedStyle(content).fontSize)-2))}px`;
document.getElementById('larger').onclick=()=>content.style.fontSize=`${Math.min(32,(parseFloat(getComputedStyle(content).fontSize)+2))}px`;
document.getElementById('theme').onclick=()=>document.body.classList.toggle('dark');
load();
