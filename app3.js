(function(){
function load(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}
var btn=document.createElement('button');btn.className='ghost';btn.type='button';btn.textContent='Suggest name from photo';btn.style.marginTop='10px';
var lab=document.querySelector('label[for=photo]');if(!lab)return;lab.parentNode.insertBefore(btn,lab.nextSibling);
var model=null,busy=false;
btn.addEventListener('click',async function(){
if(busy)return;
var f=document.getElementById('photo').files[0];
if(!f){btn.textContent='Pick a photo first';setTimeout(function(){btn.textContent='Suggest name from photo'},1500);return}
busy=true;btn.textContent='Loading AI (first time can take 10s)...';
try{
if(!window.tf)await load('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js');
if(!window.mobilenet)await load('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js');
if(!model)model=await mobilenet.load();
var preds=await model.classify(document.getElementById('preview'));
if(preds&&preds.length){
var name=preds[0].className.split(',')[0];
var item=document.getElementById('item');item.value=name;item.dispatchEvent(new Event('input'));
btn.textContent='Suggested: '+name;
}else{btn.textContent='No match - type the name'}
}catch(e){btn.textContent='AI unavailable on this network - type the name'}
busy=false;setTimeout(function(){btn.textContent='Suggest name from photo'},5000);
});
})();
