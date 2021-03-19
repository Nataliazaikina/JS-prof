//1)
text = document.querySelector('.text1').innerHTML;
console.log(text);
text2 = text.replace(/'/g, '"');
console.log(text2);

//2)
text = document.querySelector('.text1').innerHTML;
console.log(text);
text2 = text.replace(/'/g, '"');
text3 = text2.replace(/"t/g, "'t");
console.log(text3);
