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
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

//subscription display
const subList = document.querySelector('#subscription-container');

//display subscription function
const displaySub = (name, price, cat, comm) => {
  const li = document.createElement('li');
  // li.className = 'movie-card';
  li.ariaLabel = 'Subscription information';
  li.tabIndex = '0';

  const subName = document.createElement('h4');
  const subPrice = document.createElement('p');
  const category = document.createElement('p');
  const comments = document.createElement('p');
  const deleteBtn = document.createElement('span');

  deleteBtn.textContent = `x`;
  deleteBtn.classList.add('close');

  subName.textContent = name;
  subPrice.textContent = `Price per Month: $${Number(price).toLocaleString()}`;
  category.textContent = `Audience Score: ${cat}%`;
  comments.textContent = comm;
  comments.style.fontStyle = 'italic';

  li.append(deleteBtn, subName, subPrice, category, comments);
  subList.prepend(li);

  //delete li
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });
};

//form
const form = document.querySelector('.modal-content');

//submit subscription handler
const subscriptionHandler = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const { subName, subPrice, category, comments } =
    Object.fromEntries(formData);

  displaySub(subName, subPrice, category, comments);

  form.reset();
  modal.style.display = 'none';
};

form.addEventListener('submit', subscriptionHandler);
