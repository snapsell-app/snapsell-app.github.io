function makeListing(){
  var item=document.getElementById('item').value.trim()||'Item for sale';
  var brand=document.getElementById('brand').value.trim();
  var size=document.getElementById('size').value.trim();
  var cond=document.getElementById('condition').value;
  var notes=document.getElementById('notes').value.trim();
  var price=document.getElementById('price').value.trim();
  var title=item; if(size&&title.toLowerCase().indexOf(size.toLowerCase())<0)title+=' - Size '+size;
  var desc=''; if(brand)desc+='Brand: '+brand+'\n'; if(size)desc+='Size: '+size+'\n'; desc+='Condition: '+cond+'\n'; if(notes)desc+=notes+'\n'; desc+='\nFast shipping. Message me with any questions!';
  var brandcond=(brand?brand+' - ':'')+cond;
  var out=document.getElementById('listingOut');
  out.textContent='TITLE: '+title+(price?'  -  $'+price:'')+'\n\n'+desc;
  out.style.display='block';
  var cb=document.getElementById('copyBtn');cb.textContent='Copy everything';cb.style.display='block';
  var row=document.getElementById('copyRow');
  if(!row){row=document.createElement('div');row.id='copyRow';row.className='row';row.style.flexWrap='wrap';row.style.marginTop='8px';cb.parentNode.insertBefore(row,cb.nextSibling);}
  row.innerHTML='';
  window._cv={'Copy title':title,'Copy description':desc,'Copy price':price?('$'+price):'','Copy brand + condition':brandcond};
  Object.keys(window._cv).forEach(function(k){
    var b=document.createElement('button');b.className='ghost';b.type='button';b.textContent=k;
    b.onclick=function(){copyField(b,k)};row.appendChild(b);
  });
}
function copyField(b,k){
  navigator.clipboard.writeText(window._cv[k]).then(function(){
    b.textContent='Copied!';b.classList.add('copied');
    setTimeout(function(){b.textContent=k;b.classList.remove('copied')},1500);
  });
}
function copyListing(){
  var text=document.getElementById('listingOut').textContent;
  navigator.clipboard.writeText(text).then(function(){
    var b=document.getElementById('copyBtn');b.textContent='Copied!';b.classList.add('copied');
    setTimeout(function(){b.textContent='Copy everything';b.classList.remove('copied')},1500);
  });
}
