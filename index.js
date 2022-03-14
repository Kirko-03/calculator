

let input = document.getElementById('panelResult'), // input/output button
number = document.querySelectorAll('.number'), // number buttons
numbers = document.querySelector('.number'), // number buttons
dot = document.querySelector('.dot') //dot button
operator = document.querySelectorAll('.act'), // operator buttons
result = document.getElementById('result'), // equal button
clear = document.getElementById('clear'), // clear button
resultDisplayed = false; // flag to keep an eye on what output is displayed
root = document.querySelector('.root') //square root button
console.log(dot)
console.log(number)
console.log(operator)
result.disabled=true //запрет ввода

let listResults = localStorage.getItem('array') ? JSON.parse(localStorage.getItem('array')) : []
localStorage.setItem('array', JSON.stringify(listResults))

const screen = document.querySelector(".panel input")
const ul = document.querySelector('ul')
function disableNumFunc(bool){
  for(let i=0;i<number.length;i++){
      number[i].disabled = bool
  }
}
const liMaker = text => {
  listResults.length === 100 && listResults.shift()
  const li = document.createElement('li')
  ul.prepend(li)
  li.textContent = text
}
listResults.map(item => {
  liMaker(item)
})

// adding click handlers to number buttons
const arrayAction = ['-', '+', 'x', '÷', '^', '√', '%']
for (var i = 0; i < number.length; i++) {
number[i].addEventListener("click", function(e) {  
  // storing current input string and its last character in variables - used later
  var currentString = input.innerHTML;
  
  result.disabled=false

  var lastChar = currentString[currentString.length - 1];
 

  // if result is not diplayed, just keep adding
  
  if (resultDisplayed === false) {
    input.innerHTML += e.target.innerHTML;
  } else if (resultDisplayed === true &&  lastChar==='+'||lastChar==='-'||lastChar==='x'||lastChar==='÷'||lastChar==='^'||lastChar==='√'||lastChar==='%') {
    // if result is currently displayed and user pressed an operator
    // we need to keep on adding to the string for next operation

   
    resultDisplayed = false;
    input.innerHTML += e.target.innerHTML;
  }
  
  else {
    // if result is currently displayed and user pressed a number
    // we need clear the input string and add the new input to start the new opration
    resultDisplayed = false;
    input.innerHTML = "";
    input.innerHTML += e.target.innerHTML;
  }

});
}
dot.addEventListener('click',function(e){
  dot.disabled=true
  result.disabled=true
})

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {
      disableNumFunc(false)
      dot.disabled=false
      result.disabled=true
      var currentString = input.innerHTML;

    // storing current input string and its last character in variables - used later
      var lastChar = currentString[currentString.length - 1];
   
    // if last character entered is an operator, replace it with the currently pressed one
    if (lastChar==='+'||lastChar==='-'||lastChar==='x'||lastChar==='÷'||lastChar==='^'||lastChar==='√'||lastChar==='%') {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
      
    } else if (currentString.length == 0) {
      // if first key pressed is an opearator, don't do anything
      console.log("enter a number first");
    } 
    
    else {
      // else just add the operator pressed to the input
      input.innerHTML += e.target.innerHTML;
      
    }
    

  });
}

// on click of 'equal' button
 
  root.addEventListener("click",function(){
      disableNumFunc(true)
      result.disabled = false
  })
  result.addEventListener("click", function() {
    
      disableNumFunc(false)
      console.log(numbers)
      operator.disabled = false
      // this is the string that we will be processing eg. -10+26+33-56*34/23
      var inputString = input.innerHTML;
    
      // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
      var numbers = inputString.split(/\+|\-|\x|\÷|\%|\^|\√/g);
    
      // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
      // first we replace all the numbers and dot with empty string and then split
      var operators = inputString.replace(/[0-9]|\./g, "").split("");
      
      console.log(inputString);
      console.log(operators);
      console.log(numbers);
      console.log("----------------------------");
      
      
     var squareRoot = operators.indexOf("√");
    
      while (squareRoot != -1) {
        localStorage.setItem('screen', '√'+numbers[squareRoot] + '=' + Number(Math.sqrt(numbers[squareRoot])))
        numbers.splice(squareRoot, 2,Math.sqrt(parseFloat(numbers[squareRoot])));
        operators.splice(squareRoot, 1);
        squareRoot = operators.indexOf("√");
        
      }
       
      var divide = operators.indexOf("÷");
      while (divide != -1) {
        localStorage.setItem('screen', '' +parseFloat(numbers[divide])+ '÷' + parseFloat(numbers[divide+1]) + '=' + parseFloat(numbers[divide])/parseFloat(numbers[divide+1]))
          
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
      
        
      }
    
      var multiply = operators.indexOf("x");
      while (multiply != -1) {
        localStorage.setItem('screen', '' +parseFloat(numbers[multiply])+ 'x' + parseFloat(numbers[multiply+1]) + '=' +  parseFloat(numbers[multiply])*parseFloat(numbers[multiply+1]))
        
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("x");
      }
    
      var subtract = operators.indexOf("-");
      console.log(subtract)
      while (subtract != -1) {
        localStorage.setItem('screen', '' +parseFloat(numbers[subtract])+ '-' + parseFloat(numbers[subtract+1]) + '=' +  (parseFloat(numbers[subtract])-parseFloat(numbers[subtract+1])))
        
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
      }
    
      var add = operators.indexOf("+");
      while (add != -1) {
        localStorage.setItem('screen', '' +parseFloat(numbers[add]) + '+' + parseFloat(numbers[add+1]) + '=' + (parseFloat(numbers[add])+parseFloat(numbers[add+1])))

        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        console.log(numbers)
        add = operators.indexOf("+");
      }
      var degree = operators.indexOf("^");
      while (degree != -1) {
        localStorage.setItem('screen', '' +numbers[add+1]+ '^' + numbers[add+2] + '=' + Number(Math.pow( parseFloat(numbers[add+1]),parseFloat(numbers[add+2]))))
        console.log(numbers)
        numbers.splice(degree, 2, Math.pow(parseFloat(numbers[degree]), parseFloat(numbers[degree + 1])));
        
        operators.splice(degree, 1);
        degree = operators.indexOf("^");
      }
     
      var percent = operators.indexOf("%");
    
      while (percent != -1) {
        localStorage.setItem('screen', '' +numbers[percent]+ '%' + numbers[percent+1] + '=' + Number((numbers[percent])%numbers[percent+1]))
        
        numbers.splice(percent, 2,parseFloat(numbers[percent]) % parseFloat(numbers[percent + 1]));
        operators.splice(percent, 1);
        percent = operators.indexOf("%");
      }
      input.innerHTML = numbers[0]; // displaying the output
    
      let value = localStorage.getItem('screen')
              listResults.push(value)
              localStorage.setItem('array', JSON.stringify(listResults))
              liMaker(value)
    
      resultDisplayed = true; // turning flag if result is displayed
     
  })

  
// clearing the input on press of clear
clear.addEventListener("click", function() {
input.innerHTML = '';
})




