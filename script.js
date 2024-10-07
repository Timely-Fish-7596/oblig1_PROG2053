document.addEventListener('DOMContentLoaded', function () {
    let counter = 1;
    const container = document.getElementById('posts');

    function fetchPosts() {

        // fetches 9 posts at a time
        for (let i = 0; i < 9; i++) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${counter}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error! status: ${response.status}');
                } else {
                    return response.json();
                }
            })
            .then(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');
                postDiv.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                container.appendChild(postDiv);
            });

            if (counter < 100) {
                counter++;
            } else {
                counter = 1;
            }
    }}

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            fetchPosts();
        }
    });

    // initial call
    fetchPosts();
});



function updateWeather() {
    let cities = ['Oslo', 'Stockholm', 'Copenhagen', 'Helsinki', 'Reykjavik', 'Beijing'];
    let coordinates = {
        'Oslo': ['59.911491', '10.757933'],
        'Stockholm': ['59.334591', '18.063240'],
        'Copenhagen': ['55.676098', '12.568337'],
        'Helsinki': ['60.192059', '24.945831'],
        'Reykjavik': ['64.135666', '-21.862675'],
        'Beijing': ['39.916668', '116.383331']
    };
    let container;
    
    cities.forEach(city => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates[city][0]}&longitude=${coordinates[city][1]}&current_weather=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! status: ${response.status}');
            } else {
                return response.json();
            }
        })
        .then(weather => {
            container = document.getElementById(city);
            container.innerHTML = `
                <h3>${city}</h3>
                <p>Temperature: ${weather.current_weather.temperature} ${weather.current_weather_units.temperature}</p>
                <p>Wind speed: ${weather.current_weather.windspeed} ${weather.current_weather_units.windspeed}</p>
                <p>Wind direction: ${weather.current_weather.winddirection} ${weather.current_weather_units.winddirection}</p>
            `;
        });
    });
}

// Updates weather every minute
setInterval(updateWeather, 60000)


