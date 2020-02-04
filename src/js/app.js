const rootEl = document.getElementById('root'); 

rootEl.innerHTML = `
    <form data-action="submit-form">
        <label>Total</label>
        <input data-input="input-total" class="form-control" type="number" min="0" value="">
        <label>Category</label>
        <input data-input="input-category"class="form-control" type="text" value="">
        <button type="submit" class="btn btn-success btn-block margin-top">Add</button>
    </form>
    <ul data-ul="lists" class="list-group"></ul>
    <div data-total="total">TOTAL: 0</div>
`;
const inputTotal = document.querySelector('[data-input="input-total"]');
const inputCategory = document.querySelector('[data-input="input-category"]');
const addForm = document.querySelector('[data-action="submit-form"]');
const lists = document.querySelector('[data-ul="lists"]');
const total = document.querySelector('[data-total="total"]');
let sumOfPurchases = 0;

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = inputTotal.value;
    let totalValue = parseInt(value, 10);
    const categoryValue = inputCategory.value;
    if (isNaN(totalValue)) {
        sumOfPurchases += 0;
        totalValue = 0;
    } else {
        sumOfPurchases += totalValue;
    }
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `Purchase for $${totalValue} in ${categoryValue} category
    <div class="float-right"> 
        <button class="btn btn-danger remove">x</button>
        <button class="btn btn-primary move-up">↑</button>
        <button class="btn btn-primary move-down">↓</button>
    </div>
    `;
    lists.appendChild(li);
    total.textContent = `TOTAL: $${sumOfPurchases}`;
    const buttonRemove = li.querySelector('.remove');
    buttonRemove.addEventListener('click', () => {
        lists.removeChild(li);
        sumOfPurchases -= totalValue;
        total.textContent = `TOTAL: $${sumOfPurchases}`
    });
    const buttonUp = li.querySelector('.move-up');
    buttonUp.addEventListener('click', () => {
        lists.insertBefore(li, li.previousElementSibling);
    });
    const buttonDown = li.querySelector('.move-down');
    buttonDown.addEventListener('click', () => {
        if (li == lists.lastElementChild) {
            lists.insertBefore(li, lists.firstElementChild);
        } else {
        lists.insertBefore(li.nextElementSibling, li);
        }
    });
    inputTotal.value = '';
    inputCategory.value = '';
});