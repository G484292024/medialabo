function greeting(){
    let i = Number(left.value);
    let j = Number(right.value);
    let result = i+j;
    let span = document.querySelector('span#answer');
    span.textContent = result;
}
let b = document.querySelector('button#calc');
b.addEventListener('click', greeting);