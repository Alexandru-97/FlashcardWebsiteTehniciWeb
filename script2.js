//task 1.7 - ravase
let result = document.getElementById("fortuneCookie")
const fortuneCookie = 1
let num = Math.floor(Math.random()*4 + 1)
let fortuneCookieList = {
    0:"Sumthing",
    1:"You'll pass all the exams!",
    2:"Watch out for the tricky questions!",
    3:"There is a trivial exam coming your way.", 
    4:"Expectations will be exceeded!",
    5:"Cookie"
    }
function showFortuneCookie()
{
        result.innerText = fortuneCookieList[num]
}
showFortuneCookie()

//task 1.10 - schimbare indici lista
/*var indexOption = document.querySelectorAll('.indices')
console.log(indexOption.length)
indexOption.forEach(item => item.addEventListener('click', _event=>{
    aux=item.value
    decksContainer.className=aux
    console.log(item.value)
}))*/