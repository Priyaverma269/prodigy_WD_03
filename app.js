document.getElementById('search-button').addEventListener('click', function() {
    const state = document.getElementById('state-select').value;
    const city = document.getElementById('city-select').value || document.getElementById('city-input').value.trim();
    if (state && city) {
        getWeatherData(city, state);
    } else {
        alert('Please select a state and enter a city name.');
    }
});

function populateCities() {
    const state = document.getElementById('state-select').value;
    const citySelect = document.getElementById('city-select');
    const cityInput = document.getElementById('city-input');
    citySelect.innerHTML = '<option value="">Select City</option>';
    cityInput.value = '';

    const cities = {
        'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
        'Arunachal Pradesh': ['Itanagar'],
        'Assam': ['Guwahati', 'Dibrugarh', 'Silchar'],
        'Bihar': ['Patna', 'Gaya', 'Bhagalpur'],
        'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg'],
        'Goa': ['Panaji', 'Margao'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
        'Haryana': ['Chandigarh', 'Gurugram', 'Faridabad'],
        'Himachal Pradesh': ['Shimla', 'Manali'],
        'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
        'Karnataka': ['Bengaluru', 'Mysore', 'Mangalore'],
        'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
        'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior'],
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
        'Manipur': ['Imphal'],
        'Meghalaya': ['Shillong'],
        'Mizoram': ['Aizawl'],
        'Nagaland': ['Kohima'],
        'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela'],
        'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar'],
        'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
        'Sikkim': ['Gangtok'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
        'Telangana': ['Hyderabad', 'Warangal'],
        'Tripura': ['Agartala'],
        'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
        'Uttarakhand': ['Dehradun', 'Haridwar'],
        'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur'],
        'Delhi': ['New Delhi']
    };

    if (cities[state]) {
        cities[state].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

function getWeatherData(city, state) {
    const apiKey = '45d81fc2179d25bc13fe875ae6f55442';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},IN&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('city-name').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('weather-description').textContent = `Description: ${data.weather[0].description}`;
                document.querySelector('.weather-info').style.display = 'block';
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            alert('An error occurred while fetching the weather data. Please try again later.');
        });
}
