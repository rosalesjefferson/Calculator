class Calculator{
    constructor(previous, current){
        this.previousText = previous;
        this.currentText = current;
        this.currentOperand = '';
        this.previousOperand = ''
        this.operation = undefined
        // this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        //slice(0, -1) this code will get the all of the value except the last character.
        //slice(0, -2) this code will get the all of the value except the last 2 digit at the end.
        // positive number is the opposite. It means that it will get all of the value except the first character or the first 2 characters
    } 
    appendNumber(number){
        // add period once only
        // if number is equal to . and this.currentOperand includes ., we will return and prevent it from adding a . again.
        if(number === '.' && this.currentOperand.includes('.')) {
            return
        }
        // convert to string to avoid adding the value and append the value to currentOperand before passing to currentText.
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        // if this.currentOperand is empty, we will use return to prevent it from executing the code below
        //so the previous operand will not equals to empty value if you click the operation
        if(this.currentOperand === '') {
            return
        }
        //if the previous operand is not empty, we will call the compute function and compute it
        if(this.previousOperand !== ''){ 
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand;
        //clear currentOperand
        this.currentOperand = '';

    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) {
            return // means to cancel this function completely
        }

        if(this.operation === '+'){
            computation = prev + curr
        }else if(this.operation === '-'){
            computation = prev - curr
        }else if(this.operation === '*'){
            computation = prev * curr
        }else if(this.operation === '/'){
            computation = prev / curr
        }else{
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        //if user did not enter period
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
        // point . cannot be parse that's why we use the code above instead of this.
        // convert the value to number because the current value is string
        // const floatNumber = parseFloat(number);
        // //if the value is not a number, return a empty string 
        // if(isNaN(floatNumber)) return ''
        // //if the value is number, convert the floatNumber to english.
        // return floatNumber.toLocaleString('en');
    }
    updateDisplay(){
        this.currentText.innerText = this.getDisplayNumber(this.currentOperand)
    
        // add a comma and operation in to the output
        if(this.operation != undefined){
            this.previousText.innerText = `${this.previousOperand} ${this.operation}`;
        } else{
            this.previousText.innerText = ''
        }
    }
    


    //without operation and comma in the output
    // updateDisplay(){
    //     this.currentText.innerText = this.currentOperand
    //     this.previousText.innerText = this.previousOperand
    // }

    //with operation in the output but without a comma
    // updateDisplay(){
    //     this.currentText.innerText = this.currentOperand
    //     if(this.operation != undefined){
    //         this.previousText.innerText = `${this.previousOperand} ${this.operation}`;
    //     } else{
    //         this.previousText.innerText = ''
    //     }
    // }
}



const numberButtons = document.querySelectorAll('[data-number');
const operationButtons = document.querySelectorAll('[data-operation');
const equalsButton = document.querySelector('[data-equals');
const deleteButton = document.querySelector('[data-delete');
const allClearButton = document.querySelector('[data-all-clear');
const previousOperand = document.querySelector('[data-previous-operand');
const currentOperand = document.querySelector('[data-current-operand');

const calculator = new Calculator(previousOperand, currentOperand);

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () =>{
    calculator.delete();
    calculator.updateDisplay();
})