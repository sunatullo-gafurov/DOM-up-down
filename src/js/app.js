const rootEl = document.querySelector('#root').innerHTML = `
    <form>
        <label><h3>Total</h3></label>
        <input data-input="input-total" class="form-control" type="number" min="0" value="">
        <label><h3>Category</h3></label>
        <input data-input="input-category"class="form-control" type="text" value="">
        <button data-action="add-button"type="submit" class="btn btn-success btn-block margin-top">Add</button>
    </form>
    <ul data-ul="lists" class="list-group"></ul>
    <div data-total="total"><h5 data-h5="total">TOTAL: 0</h5></div>
`;
const inputTotal = document.querySelector('[data-input="input-total"]');
const inputCategory = document.querySelector('[data-input="input-category"]');
const addForm = document.querySelector('[data-action="add-button"]');
const lists = document.querySelector('[data-ul="lists"]');
const total = document.querySelector('[data-h5="total"]');
let sumOfPurchases = 0;

addForm.addEventListener('click', (e) => {
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
        lists.insertBefore(li, li.previousSibling);
    });
    const buttonDown = li.querySelector('.move-down');
    buttonDown.addEventListener('click', () => {
        if (li == lists.lastChild) {
            lists.insertBefore(li, lists.firstChild);
        } else {
        lists.insertBefore(li.nextSibling, li);
        }
    });
    inputTotal.value = '';
    inputCategory.value = '';
});