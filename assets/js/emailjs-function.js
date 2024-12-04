//emailjs-function.js

function sendEmail() {
    var templateParams = {
        name: document.getElementById('form-contact-name').value,
        email: document.getElementById('form-contact-email').value,
        subject: document.getElementById('form-contact-subject').value,
        message: document.getElementById('form-contact-message').value
    };

    emailjs.send('service_n54wizj', 'template_vo7tve6', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           document.getElementById('form-contact').reset();
           alert('Ihre Nachricht wurde erfolgreich gesendet!');
        }, function(error) {
           console.log('FAILED...', error);
           alert('Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es erneut.');
        });
}

