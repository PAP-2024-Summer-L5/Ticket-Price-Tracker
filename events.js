document.addEventListener('DOMContentLoaded', function () {
    const eventList = document.getElementById('event-list');
    const filterButton = document.getElementById('filter-button');
    const userLocationInput = document.getElementById('user-location');
    const filterDateInput = document.getElementById('filter-date');

    // Fetch events data from the Ticketmaster API
    const fetchEvents = () => {
        fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=WGglwpWGVQbbLvFl9Ugw2niwCCWQ34sZ&size=50')
            .then(response => response.json())
            .then(data => {
                const events = data._embedded.events;
                displayEvents(events);
            })
            .catch(error => console.error('Error fetching events:', error));
    };

 // Display events in a grid
const displayEvents = (events) => {
    eventList.innerHTML = ''; // Clear existing events
    events.forEach(event => {
        const li = document.createElement('li');
        li.className = 'col-md-3 mb-4';  // Bootstrap class for responsive columns

        const card = document.createElement('div');
        card.className = 'card h-100';

        const img = document.createElement('img');
        img.src = event.images[0].url;
        img.className = 'card-img-top';
        card.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const name = document.createElement('h5');
        name.className = 'card-title';
        name.textContent = event.name;
        cardBody.appendChild(name);

        const date = document.createElement('p');
        date.className = 'card-text';
        date.textContent = `Date: ${event.dates.start.localDate}`;
        cardBody.appendChild(date);

        const time = document.createElement('p');
        time.className = 'card-text';
        time.textContent = `Time: ${event.dates.start.localTime}`;
        cardBody.appendChild(time);

        const venue = document.createElement('p');
        venue.className = 'card-text';
        venue.textContent = `Location: ${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.name}`;
        cardBody.appendChild(venue);

        const url = document.createElement('a');
        url.href = event.url;
        url.className = 'btn btn-primary';
        url.textContent = "Buy Tickets";
        url.target = "_blank";
        cardBody.appendChild(url);

        card.appendChild(cardBody);
        li.appendChild(card);
        eventList.appendChild(li);
    });
};


    // Filter events by location and date
    const filterEvents = () => {
        const userLocation = userLocationInput.value.toLowerCase();
        const filterDate = filterDateInput.value;

        fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=WGglwpWGVQbbLvFl9Ugw2niwCCWQ34sZ&size=50')
            .then(response => response.json())
            .then(data => {
                let events = data._embedded.events;
                events = events.filter(event => {
                    const eventLocation = event._embedded.venues[0].city.name.toLowerCase();
                    const isLocationMatch = userLocation ? eventLocation.includes(userLocation) : true;
                    const isDateMatch = filterDate ? event.dates.start.localDate === filterDate : true;
                    return isLocationMatch && isDateMatch;
                });
                displayEvents(events);
            })
            .catch(error => console.error('Error filtering events:', error));
    };

    filterButton.addEventListener('click', filterEvents);

    // Load and display events on page load
    fetchEvents();
});
