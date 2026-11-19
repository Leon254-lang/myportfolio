/**
 * Submit the portfolio contact form to the Django API.
 */
(function () {
  "use strict";

  const forms = document.querySelectorAll('.contact-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const thisForm = this;

      const action = thisForm.getAttribute('action');
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      submitContactForm(thisForm, action);
    });
  });

  function submitContactForm(thisForm, action) {
    fetch(action, {
      method: 'POST',
      body: new FormData(thisForm)
    })
    .then(async (response) => {
      const data = await response.text();
      if (!response.ok) {
        throw new Error(data || `${response.status} ${response.statusText}`);
      }
      if (data.trim() !== 'OK') {
        throw new Error(data || 'Contact form submission failed.');
      }

      thisForm.querySelector('.loading').classList.remove('d-block');
      if (response.ok) {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      }
    })
    .catch((error) => {
      displayError(thisForm, error instanceof Error ? error.message : String(error));
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').textContent = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
