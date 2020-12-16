function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const expenses = [];
const income = [];
const allIncomeExpense = []
let totalIncome = 0;
let totalExpenses = 0;

//Add transaction
document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();

    const transactionItem = document.querySelector('input[type="text"]').value;
    const transactionAmount = Number(document.querySelector('input[type="number"]').value);

    const newTransaction = {
        id: uuidv4(),
        item: transactionItem,
        amount: transactionAmount
    }

    if (transactionAmount > 0) {
        income.push(newTransaction)
        allIncomeExpense.push(newTransaction)
    } else {
        expenses.push(newTransaction)
        allIncomeExpense.push(newTransaction)
    }

    document.querySelector('input[type="text"]').value = ''
    document.querySelector('input[type="number"]').value = ''
    render(allIncomeExpense, income, expenses);
}

//Render transactions 
function render(allItems, inc, exp) {
    document.querySelector('.transactions').innerHTML = ''

    allItems.forEach(el => {
        const itemColor = el.amount > 0 ? 'item-amount float-right green py-2 pr-2' : 'item-amount float-right red py-2 pr-2'

        const transactionUI = `<li class="list-group-item p-0" id=${el.id}>
            <span class="btn btn-danger float-left">x</span>
            <span class="py-2 pl-2 float-left">${el.item}</span>
            <span class="${itemColor}">${el.amount}</span>
          </li>`

        const ul = document.createElement('ul')
        ul.className = 'list-group'
        ul.innerHTML = transactionUI
        document.querySelector('.transactions').appendChild(ul)
    })

    totalIncome = 0;
    totalExpenses = 0;

    inc.forEach(el => {
        totalIncome += el.amount
    })
    exp.forEach(el => {
        totalExpenses += el.amount
    })

    document.querySelector('.income-amount').textContent = '$' + totalIncome
    document.querySelector('.expense-amount').textContent = '$' + totalExpenses
    document.querySelector('.balance').textContent = `$${totalIncome + totalExpenses}`
}

//Delete transaction
document.querySelector('.transactions').addEventListener('click', function (e) {

    if (e.target.classList.contains('btn-danger')) {
        const id = e.target.parentElement.id
        const foundIndex = allIncomeExpense.findIndex(item => {
            item.id == id
        })

        allIncomeExpense.splice(foundIndex, 1)


        const foundIndexIcome = income.findIndex(item => item.id == id)
        const foundIndexExpense = income.findIndex(item => item.id == id)

        if (foundIndexIcome !== -1) { income.splice(foundIndexIcome, 1) }
        if (foundIndexExpense !== -1) { expenses.splice(foundIndexExpense, 1) }




        render(allIncomeExpense, income, expenses)
    }
})