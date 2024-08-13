document.addEventListener("DOMContentLoaded", () => {
    const eventForm = document.getElementById('event-form');
    const eventList = document.getElementById('event-list');

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const eventName = document.getElementById('event-name').value;
        const eventDate = document.getElementById('event-date').value;
        const eventTime = document.getElementById('event-time').value;
        const eventLocation = document.getElementById('event-location').value;
        const eventDescription = document.getElementById('event-description').value;
        const eventPhoto = document.getElementById('event-photo').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const event = {
                name: eventName,
                date: eventDate,
                time: eventTime,
                location: eventLocation,
                description: eventDescription,
                photo: e.target.result
            };

            saveEvent(event);
            displayEvent(event);
        };
        if (eventPhoto) {
            reader.readAsDataURL(eventPhoto);
        } else {
            const event = {
                name: eventName,
                date: eventDate,
                time: eventTime,
                location: eventLocation,
                description: eventDescription,
                photo: ''
            };
            saveEvent(event);
            displayEvent(event);
        }

        // Clear the form
        eventForm.reset();
    });

    const saveEvent = (event) => {
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Event saved:', data);
            displayEvent(event);
        })
        .catch(error => console.error('Error saving event:', error));
    };
    

    const displayEvent = (event) => {
        const eventItem = document.createElement('li');
        eventItem.innerHTML = `
            <strong>${event.name}</strong><br>
            <em>${event.date} at ${event.time}</em><br>
            <span>${event.location}</span><br>
            <p>${event.description}</p>
        `;
        if (event.photo) {
            const img = document.createElement('img');
            img.src = event.photo;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            eventItem.appendChild(img);
        }
        eventList.appendChild(eventItem);
    };

});
