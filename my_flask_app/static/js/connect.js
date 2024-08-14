
const form = document.querySelector('#form');

async function post(event) {
    event.preventDefault();

    const artist = document.querySelector('#artist');
    const state = document.querySelector('#state');
    const country = document.querySelector('#country');

    const artistValue = artist.value;
    const stateCode = state.value;
    const countryCode = country.value;

    const data = {
        artist: artistValue,
        state: stateCode,
        country: countryCode
    }

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log('data posted');
    } catch(e) {
        console.error(e);
    }
}

form.addEventListener('submit', post);