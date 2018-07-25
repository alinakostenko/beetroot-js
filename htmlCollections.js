var ul = document.getElementsByTagName('ul')[0];

var liLiveCollection = ul.getElementsByTagName('li');
var liStaticCollection = ul.querySelectorAll('li');

console.log(liLiveCollection);
console.log(liStaticCollection);

ul.removeChild(ul.firstElementChild);

console.log(liLiveCollection);
console.log(liStaticCollection);

var newLi = document.createElement('li');
newLi.className = 'new';
newLi.textContent = 'New';
ul.appendChild(newLi);

console.log(liLiveCollection);
console.log(liStaticCollection);