
const form = document.querySelector('#form');

async function post(event) {
    event.preventDefault();

    const artist = document.querySelector('#artist');
    const artistValue = artist.value;
    const data = {
        artist: artistValue
    }
    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch(e) {
        console.error(e);
    }
}

form.addEventListener('submit', post);