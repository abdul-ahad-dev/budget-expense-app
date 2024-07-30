document.getElementById('budget-btn').addEventListener('click', budget)

function budget()
{
    let getBudget = document.getElementById('get-budget').value
    
    if (getBudget == '') {
        alert('Enter your Budget');
        return
    }

    document.querySelector('#budget').textContent = getBudget
    document.querySelector('#balance').textContent = getBudget
    
    
}

const expenseItem = []

document.getElementById('add-expense').addEventListener('click', expense)

function expense()
{
    let expenseName = document.querySelector('#expense-name')
    let expenseAmount = document.querySelector('#expense-amount')
    let filterCategory = document.querySelector('#filter-category')

    let getBudget = document.getElementById('get-budget');

    let tblContent = document.querySelector('#tbl-content')

    let budgetCard = document.querySelector('#budget').textContent
    let expensesCard = document.querySelector('#expenses')
    let balanceCard = document.querySelector('#balance')

    if (budgetCard == 'Amount') {
        alert("please Enter Budge")
        return
    }

    if (expenseName.value == '' && expenseAmount.value == '') {
        alert("Enter Expense Name & Amount")
        return
    }

    if (expenseName.value !== '' && expenseAmount.value !== '') {
        let expenseValue = parseInt(expensesCard.textContent) + +expenseAmount.value;
        let balanceValue = parseInt(balanceCard.textContent) - expenseAmount.value;

        if (expenseValue > +budgetCard) {
            alert("Expense value is Greater than budget value");
            return
        }

        let item = {
            Name: expenseName.value,
            Amount: expenseAmount.value,
            Category: filterCategory.value,
        }

        expenseItem.push(item)

        localStorage.setItem('item', JSON.stringify(expenseItem))

        expensesCard.textContent = expenseValue;
        balanceCard.textContent = balanceValue

        tblContent.innerHTML += `
        <tr>
                    <td>${expenseName.value}</td>
                    <td>Rs: ${expenseAmount.value}</td>
                    <td>${filterCategory.value}</td>
                    <td>
                        <button class="delete-expense-row"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
    `
        deleteEvent();
    }
    expenseName.value = ''
    expenseAmount.value = ''
    filterCategory.value = selected
}



function deleteEvent()
{
    let expenseBtns = document.querySelectorAll('.delete-expense-row');
    expenseBtns.forEach((btn) =>
    {
        btn.addEventListener('click', expenseDel);
    });
}

function expenseDel(e)
{
    let row = e.target.closest('tr');
    row.remove();
    updateExpensesAndBalance();
}

function updateExpensesAndBalance()
{
    const expenseRows = document.querySelectorAll('#tbl-content tr');
    let totalExpenses = 0;
    expenseRows.forEach(row =>
    {
        const amount = parseInt(row.cells[1].textContent.replace('Rs: ', ''));
        totalExpenses += amount;
    });

    document.querySelector('#expenses').textContent = totalExpenses;
    const budget = parseInt(document.querySelector('#budget').textContent);
    document.querySelector('#balance').textContent = budget - totalExpenses;
}


deleteEvent();
