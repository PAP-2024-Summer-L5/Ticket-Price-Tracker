document.addEventListener("DOMContentLoaded", () => {
    const eventList = document.getElementById('event-list');

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

    // Load and display events from localStorage on page load
    const loadEvents = () => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => displayEvent(event));
    };

    loadEvents();
});

document.addEventListener("DOMContentLoaded", () => {
    const eventList = document.getElementById('event-list');
    const filterButton = document.getElementById('filter-button');
    const userLocationInput = document.getElementById('user-location');
    const filterDateInput = document.getElementById('filter-date');

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

    // Load and display events from localStorage on page load
    const loadEvents = () => {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => displayEvent(event));
    };

    const filterEvents = () => {
        const userLocation = userLocationInput.value.toLowerCase();
        const filterDate = filterDateInput.value;

        const events = JSON.parse(localStorage.getItem('events')) || [];
        const filteredEvents = events.filter(event => {
            const eventLocation = event.location.toLowerCase();
            const isLocationMatch = userLocation ? eventLocation.includes(userLocation) : true;
            const isDateMatch = filterDate ? event.date === filterDate : true;
            return isLocationMatch && isDateMatch;
        });

        // Clear the current list
        eventList.innerHTML = '';
        filteredEvents.forEach(event => displayEvent(event));
    };

    filterButton.addEventListener('click', filterEvents);

    loadEvents();
});

document.addEventListener("DOMContentLoaded", function() {
    const eventList = document.getElementById('event-list');

    fetch('events_data.json')
        .then(response => response.json())
        .then(data => {
            const events = data._embedded.events;
            events.forEach(event => {
                const li = document.createElement('li');

                const img = document.createElement('img');
                img.src = event.images[0].url;
                li.appendChild(img);

                const name = document.createElement('h3');
                name.textContent = event.name;
                li.appendChild(name);

                const date = document.createElement('p');
                date.textContent = `Date: ${event.dates.start.localDate}`;
                li.appendChild(date);

                const time = document.createElement('p');
                time.textContent = `Time: ${event.dates.start.localTime}`;
                li.appendChild(time);

                const venue = document.createElement('p');
                venue.textContent = `Venue: ${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.name}`;
                li.appendChild(venue);

                const url = document.createElement('a');
                url.href = event.url;
                url.textContent = "Buy Tickets";
                url.target = "_blank";
                li.appendChild(url);

                eventList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching events:', error));
});
