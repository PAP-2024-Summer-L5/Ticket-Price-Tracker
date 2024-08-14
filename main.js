document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const eventForm = document.getElementById('event-form');
    console.log("Event form found:", eventForm);

    // const eventList = document.getElementById('event-list');

    // eventForm.addEventListener('submit', (e) => {
    //     e.preventDefault();

        // const eventName = document.getElementById('event-name').value;
        // console.log("Event Name:", eventName);

        // const eventDate = document.getElementById('event-date').value;
        // const eventTime = document.getElementById('event-time').value;
        // const eventLocation = document.getElementById('event-location').value;
        // const eventDescription = document.getElementById('event-description').value;
        // const eventPhoto = document.getElementById('event-photo').files[0];

        // const reader = new FileReader();
        // reader.onload = function(e) {
// This is the JSON - Constand data change to constant event - Include tri catch block in Const event - include in async function called post 



    async function post(event) {
        event.preventDefault();
        console.log("Form submitted, post function triggered");

        const name = document.querySelector('#event-name');
        const date = document.querySelector('#event-date');
        const time = document.querySelector('#event-time');
        const location = document.querySelector('#event-location');
        const description = document.querySelector('#event-description');
        
        const eventName = name.value;
        const eventDate = date.value;
        const eventTime = time.value;
        const eventLocation = location.value;
        const eventDescription = description.value;

        const eventData = { //Renamed to eventData to not conlict with Async funct post(event) - double declaration
                name: eventName,
                date: eventDate,
                time: eventTime,
                location: eventLocation,
                description: eventDescription
                // photo: e.target.result //E is not defined- Also because we're not using FileReader - can't handle file updloads? 
                };
                console.log("Event Data:", eventData);

                try {
                    const response = await fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventData)
                    });
                    // console.log("Server response:", response);
                } catch(error) {
                    // console.error(e);
                }
            }
            eventForm.addEventListener('submit', post);
            // console.log("Submit event listener added");

})
//=================================================================================================