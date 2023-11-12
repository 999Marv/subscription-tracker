//form
const form = document.querySelector('.modal-content');

//local storage functions
const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageValue = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Get the modal
var modal = document.querySelector('.modal');

// Get the button that opens the modal
var btn = document.querySelector('#myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
  form.reset();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    form.reset();
  }
};

//subscription display
const subList = document.querySelector('#subscription-container');

//total price
const total = document.querySelector('.total');
let totalPrice = 0;

//display subscription function
const displaySub = (name, price, cat, comm) => {
  const li = document.createElement('li');
  li.className = 'subscription';
  li.ariaLabel = 'Subscription information';
  li.tabIndex = '0';

  const subName = document.createElement('h4');
  const subPrice = document.createElement('p');
  const category = document.createElement('p');
  const comments = document.createElement('p');
  const deleteBtn = document.createElement('span');

  deleteBtn.textContent = `x`;
  deleteBtn.classList.add('close');

  if (comm === '') {
    comments.textContent = 'No comments';
    comments.classList.add('no-comm');
  } else {
    comments.textContent = comm;
  }

  subName.textContent = name;
  subPrice.textContent = `Price per Month: $${Number(price).toLocaleString()}`;
  category.textContent = `Category: ${cat}`;
  comments.style.fontStyle = 'italic';
  comments.classList.add('comm');

  li.append(deleteBtn, subName, subPrice, category, comments);

  subList.append(li);

  //delete li
  deleteBtn.addEventListener('click', () => {
    li.remove();
    localStorage.removeItem(name);
    totalPrice -= price;
    total.textContent = `Total monthly cost: $${totalPrice}`;
  });

  totalPrice += +price;
  total.textContent = `Total monthly cost: $${totalPrice}`;
};

//submit subscription handler
const subscriptionHandler = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const { subName, subPrice, category, comments } =
    Object.fromEntries(formData);

  displaySub(subName, subPrice, category, comments);

  form.reset();
  modal.style.display = 'none';

  //save to local storage
  setLocalStorageKey(subName, { subName, subPrice, category, comments });
};

form.addEventListener('submit', subscriptionHandler);

const displayLocal = () => {
  Object.keys(localStorage).forEach((key) => {
    const { subName, subPrice, category, comments } = getLocalStorageValue(key);

    displaySub(subName, subPrice, category, comments);
  });
};

const main = () => {
  displayLocal();
};

main();
