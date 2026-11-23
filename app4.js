(function(){
var WORKER='https://weathered-truth-998a.dcfranco613.workers.dev';
var btn=document.createElement('button');btn.className='ghost';btn.type='button';btn.textContent='AI: name + price from photo';btn.style.marginTop='10px';
var hint=document.createElement('p');hint.className='hint';hint.style.display='none';
var lab=document.querySelector('label[for=photo]');if(!lab)return;
lab.parentNode.insertBefore(btn,lab.nextSibling);lab.parentNode.insertBefore(hint,btn.nextSibling);
var busy=false;
function img64(f){return new Promise(function(res,rej){var img=new Image();img.onload=function(){var c=document.createElement('canvas');var s=Math.min(1,800/Math.max(img.width,img.height));c.width=img.width*s;c.height=img.height*s;c.getContext('2d').drawImage(img,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',0.8).split(',')[1])};img.onerror=rej;img.src=URL.createObjectURL(f)})}
btn.addEventListener('click',async function(){
if(busy)return;
var f=document.getElementById('photo').files[0];
if(!f){btn.textContent='Pick a photo first';setTimeout(function(){btn.textContent='AI: name + price from photo'},1500);return}
busy=true;btn.textContent='Asking AI (~5s)...';hint.style.display='none';
try{
var b64=await img64(f);
var r=await fetch(WORKER,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image:b64,mime:'image/jpeg'})});
var j=await r.json();
if(j&&j.name){
var item=document.getElementById('item');item.value=j.name;item.dispatchEvent(new Event('input'));
var msg='Suggested: '+j.name;
if(j.price_low&&j.price_high){msg+=' - used price about $'+Math.round(j.price_low)+'-$'+Math.round(j.price_high);
var p=document.getElementById('price');if(!p.value)p.value=Math.round((j.price_low+j.price_high)/2);
msg+=' (edit anything)'}
hint.textContent=msg;hint.style.display='block';btn.textContent='Done - edit below if needed';
}else{btn.textContent='No answer - type the name'}
}catch(e){btn.textContent='AI offline - use on-device button'}
busy=false;setTimeout(function(){btn.textContent='AI: name + price from photo'},6000);
});
})();
