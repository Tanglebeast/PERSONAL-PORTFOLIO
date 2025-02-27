function sendEmail() {
    // Referenzen auf DOM-Elemente
    const form = document.getElementById('form-contact');
    const button = document.getElementById('form-contact-submit');
    const status = document.querySelector('.form-contact-status');

    // Button deaktivieren und Ladezustand anzeigen
    button.disabled = true;
    button.innerHTML = 'Wird gesendet...';

    // Formulardaten sammeln
    const templateParams = {
        name: document.getElementById('form-contact-name').value,
        email: document.getElementById('form-contact-email').value,
        subject: document.getElementById('form-contact-subject').value,
        message: document.getElementById('form-contact-message').value
    };

    // EmailJS senden
    emailjs.send('service_n54wizj', 'template_vo7tve6', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Formular zurücksetzen
            form.reset();
            // Erfolgsmeldung anzeigen
            status.innerHTML = 'Ihre Nachricht wurde erfolgreich gesendet!';
            status.style.color = 'green';
            // Button zurücksetzen
            button.disabled = false;
            button.innerHTML = 'Nachricht senden';
        }, function(error) {
            console.log('FAILED...', error);
            // Fehlermeldung anzeigen
            status.innerHTML = 'Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es erneut.';
            status.style.color = 'red';
            // Button zurücksetzen
            button.disabled = false;
            button.innerHTML = 'Nachricht senden';
        });
}