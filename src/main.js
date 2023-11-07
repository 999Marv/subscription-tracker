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

//form
const form = document.querySelector('.modal-content');

//submit subscription handler
const subscriptionHandler = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const { subName, subPrice, category, comments } =
    Object.fromEntries(formData);

  console.log(subName, subPrice, category, comments);

  form.reset();
  modal.style.display = 'none';
};

form.addEventListener('submit', subscriptionHandler);

//subscription display
const subList = document.querySelector('#subscription-container');
