function openPage(pageName) {
    window.location.href = pageName; // Redirige vers la page
}

document.addEventListener('DOMContentLoaded', () => {
    // Votre autre code ici...



    let currentIndex = 0;


    


    // Initialisation d'EmailJS
    emailjs.init("a8HUDdUpYxIlZt0af");

    // Gestion des boutons d'options
    const optionButtons = document.querySelectorAll('.optionButton');
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('white'); // Ajoute/enlève la classe
        });
    });

    // Gestion du bouton d'envoi d'e-mail
    const sendEmailButton = document.getElementById('sendEmailButton');
    if (sendEmailButton) {
        sendEmailButton.addEventListener('click', () => {
            // Vérifie si un forfait est sélectionné
            const selectedForfaitElement = document.querySelector('input[name="forfait"]:checked');
            if (!selectedForfaitElement) {
                alert("Veuillez sélectionner un forfait.");
                return;
            }

            const selectedForfait = selectedForfaitElement.nextSibling.nodeValue.trim();

            // Récupère les options sélectionnées
            const selectedOptions = Array.from(document.querySelectorAll('.optionButton.white'))
                .map(option => option.innerText);

            // Récupère les informations du formulaire
            const nom = document.getElementById('nom').value;
            const prenom = document.getElementById('prenom').value;
            const telephone = document.getElementById('telephone').value;
            const email = document.getElementById('email').value;
            const dateEvent = document.getElementById('date').value;
            const lieuEvent = document.getElementById('lieu').value;
            const description = document.getElementById('message').value;

            // Vérifie si tous les champs obligatoires sont remplis
            if (!nom || !prenom || !telephone || !email || !dateEvent || !lieuEvent || !description) {
                alert("Veuillez remplir tous les champs obligatoires.");
                return;
            }

            // Prépare les données pour EmailJS
            const templateParams = {
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                email: email,
                dateEvent: dateEvent,
                lieuEvent: lieuEvent,
                forfait: selectedForfait,
                options: selectedOptions.join(', '),
                description: description
            };

            // Envoie l'e-mail via EmailJS
            emailjs.send('service_hk4o8l2', 'template_x9xee09', templateParams)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Informations envoyées avec succès !');
                    document.getElementById('contactForm').reset(); // Réinitialise le formulaire

                    // Réinitialise les boutons d'options
                    optionButtons.forEach(button => {
                        button.classList.remove('white');
                    });
                })
                .catch((err) => {
                    console.error('FAILED...', err);
                    alert("Échec de l'envoi des informations. Veuillez réessayer.");
                });
        });
    }
});

