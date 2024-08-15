document.addEventListener("DOMContentLoaded", function() {
    const eventList = document.getElementById('event-list');
    const filterButton = document.getElementById('filter-button');
    const userVenueInput = document.getElementById('user-venue');   
    const filterDateInput = document.getElementById('filter-date'); 

    // Updated display function using Bootstrap grid and cards
    const displayEvents = (events) => {
        eventList.innerHTML = ''; // Clear previous events
        events.forEach(event => {
            const li = document.createElement('li');
            li.className = 'col-lg-4 col-md-6 mb-4'; // Bootstrap classes for grid layout

            const card = document.createElement('div');
            card.className = 'card h-100';

            const img = document.createElement('img');
            img.src = event.images?.[0]?.url || 'default-image.jpg'; // This code uses a default image if not available
            img.alt = event.name || 'Event Image';
            img.className = 'card-img-top';
            card.appendChild(img);

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const name = document.createElement('h5');
            name.className = 'card-title';
            name.textContent = event.name || 'No name available';
            cardBody.appendChild(name);

            const date = document.createElement('p');
            date.className = 'card-text';
            date.textContent = `Date: ${event.dates?.start?.localDate || 'Date not available'}`;
            cardBody.appendChild(date);

            const time = document.createElement('p');
            time.className = 'card-text';
            time.textContent = `Time: ${event.dates?.start?.localTime || 'Time not available'}`;
            cardBody.appendChild(time);

            const venue = document.createElement('p');
            venue.className = 'card-text';
            venue.textContent = `Location: ${event._embedded?.venues?.[0]?.name || 'Venue not available'}, ${event._embedded?.venues?.[0]?.city?.name || ''}, ${event._embedded?.venues?.[0]?.state?.name || ''}`;
            cardBody.appendChild(venue);

            const url = document.createElement('a');
            url.href = event.url || '#';
            url.className = 'btn btn-primary';
            url.textContent = "Buy Tickets";
            url.target = "_blank";
            cardBody.appendChild(url);

            card.appendChild(cardBody);
            li.appendChild(card);
            eventList.appendChild(li);
        });
    };

    const fetchEvents = () => {
        fetch('/static/data/events_data.json')
            .then(response => response.json())
            .then(data => {
                const events = data._embedded.events;
                displayEvents(events);
            })
            .catch(error => console.error('Error fetching events:', error));
    };

    const filterEvents = () => {
        const userVenue = userVenueInput.value.toLowerCase();
        const filterDate = filterDateInput.value;

        fetch('/static/data/events_data.json')
            .then(response => response.json())
            .then(data => {
                let events = data._embedded.events;
                events = events.filter(event => {
                    const venueName = event._embedded?.venues[0]?.name?.toLowerCase() || '';
                    const isVenueMatch = userVenue ? venueName.includes(userVenue) : true;
                    const isDateMatch = filterDate ? event.dates.start.localDate === filterDate : true;
                    return isVenueMatch && isDateMatch;
                });
                displayEvents(events);
            })
            .catch(error => console.error('Error filtering events:', error));
    };

    filterButton.addEventListener('click', filterEvents);

    fetchEvents(); // Load and display events on page load
});
