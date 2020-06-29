//task 1.10 - schimbare indici lista
var indexOption = document.querySelectorAll('.indices')
indexOption.forEach(item => item.addEventListener('click', _event=>{
    aux=item.value
    decksContainer.className=aux
}))

//
//De ce nu a functionat asta?
/*function changeIndex(x)
{
    let aux = indexOption[x].value
    decksContainer.className=aux
}

for (let i = 0 ; i < indexOption.length; i++)
{   
    indexOption[i].addEventListener("click", changeIndex(i));
    console.log(i)
    console.log(decksContainer.className)
}
*/

//task 1.11 - culoare valida
var applyColour = document.getElementById('set-colour')
var inputColour = document.getElementById("valid-colour")

function changeColor(strColour){
    var s = new Option().style
    s.color = strColour
    if(s.color == strColour) 
        {
            document.body.style.backgroundColor = strColour;
        }
    else alert("Culoare invalida")
  }

  applyColour.addEventListener('click', function(){
      changeColor(inputColour.value)
  })

  //task 1.6 - numaratoare inversa
  var countDownDate = new Date("Jun 29, 2020 18:32:30").getTime();
  var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var hours = Math.floor(distance / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  document.getElementById("countdown").innerHTML = hours + "h "
  + minutes + "m " + seconds + "s ";
     
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Fun time's on!";
  }
}, 1000);

//task 3.2 - quiz cu rasp multiple + quiz in timp limita(2.8)
   var startQuizBtn = document.getElementById('start-quiz') 
   var quiz = document.getElementById('quiz')
   var quizList = document.getElementById('quiz-list')
   var questionList = [
    {
        intrebare: "Do you love javascript?",
        raspunsuri: [[" Yes, ofc", true], [" Noo!", false], [" Maybe", false],[" Other", false]]
    }, 
     {
        intrebare: "How do you feel about web dev?", 
        raspunsuri: [[" Meh", false], [" It is indeed fun!", true], [" It is a bit difficult.", true],[" Other", false]]
     },
     {
        intrebare: "Are u passing all your finals?",
        raspunsuri: [[" maybe:)", true], [" r2", false], [" r3", false],[" r4", false]]
     },
     {
        intrebare: "Would you use this website again?",
        raspunsuri: [[" r1", false], [" r2", false], [" r3", false],[" yes", true]]
     }
   ]
   
   for(let i = 0; i<questionList.length; i++)
   {
       var question = document.createElement("LI")
       var t = document.createTextNode(questionList[i].intrebare)
       question.appendChild(t)
       var el = document.getElementById('quiz-list').appendChild(question)

       for (let j=0; j<4; j++)
       {
        var ans = document.createElement("INPUT")
        ans.setAttribute("type", "checkbox") 
        ans.className = "quiz-checkbox" 
        var newLabel = document.createElement("LABEL")
        var temp = document.createTextNode(questionList[i].raspunsuri[j][0])
        newLabel.appendChild(temp)
        ans.appendChild(newLabel)
        document.getElementById('quiz-list').appendChild(ans)
        document.getElementById('quiz-list').appendChild(temp)
        var br = document.createElement("br")
        document.getElementById('quiz-list').appendChild(br)
       }   
   }


    var checkboxContainer = document.getElementsByClassName("quiz-checkbox")
    var submitQuizBtn = document.createElement('BUTTON')

   var timer
   startQuizBtn.addEventListener('click', function(){
       quiz.style.opacity=1
       startQuizBtn.style.opacity=0
       timer = setTimeout(function(){
           alert("Oops, time is up!")
           for(let i=0; i<checkboxContainer.length; i++)
           {
            checkboxContainer[i].disabled = true
            submitQuizBtn.disabled = true
           }
        }, 20000)
       }
    )

    br = document.createElement("br")
    document.getElementById('quiz-list').appendChild(br)
    document.getElementById('quiz-list').appendChild(submitQuizBtn)
    submitQuizBtn.innerHTML = "Submit answer"
    submitQuizBtn.style.width = '100px'
    submitQuizBtn.style.height = '50px'
    submitQuizBtn.style.backgroundColor = 'thistle'
    br = document.createElement("br")
    submitQuizBtn.appendChild(br)
    

    submitQuizBtn.addEventListener('click', 
        function()
        {   
            window.clearTimeout(timer)
            let scor = 0, ok = 1
            for(i=0; i<checkboxContainer.length; i++)
            {
                if (checkboxContainer[i].checked)
                {
                    if(questionList[Math.floor(i/4)].raspunsuri[i%4][1] == false)
                        ok = 0
                } 
                else 
                {
                    if(questionList[Math.floor(i/4)].raspunsuri[i%4][1] == true) 
                        ok = 0
                }
                if((i+1)%4==0)
                {
                    if(ok==1) scor+=5
                    ok=1
                }
                checkboxContainer[i].disabled = true
                submitQuizBtn.disabled = true
            }
                  
            var par = document.createElement("P")
            t = document.createTextNode("You scored " + scor + " out of " +
            (questionList.length)*5 + "!")
            par.appendChild(t)
            document.getElementById('quiz').appendChild(par)
        }
    )

   