let formElement = document.querySelector('form');
let msg1 = document.querySelector('.msg1');
let msg2 = document.querySelector('.msg2');
let msg3 = document.querySelector('.msg3');
let msg4 = document.querySelector('.msg4');
let msg5 = document.querySelector('.msg5');
let heading = document.querySelector('.heading');

if(formElement) {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        search = document.querySelector('input');
        url = 'http://localhost:3000/weather?location=' + search.value;
        fetch(url).then((response)=>{
            // console.log('Response json is ',response.json())
            response.json().then((data)=>{
                console.log(data);
                if(data.error){
                    msg1.textContent = "Error is " + data.error;
                } else {
                    heading.textContent = "Current Information of " + search.value[0].toUpperCase() + search.value.substring(1) + ":";
                    msg1.textContent = "Coordinates are " + JSON.stringify(data.coordinates);
                    msg2.textContent = "Description is " + data.description;
                    msg3.textContent = "Temperature is " + data.temperature;
                    msg4.textContent = "Pressure is " + data.pressure;
                    msg5.textContent = "Humidity is " + data.humidity;
                }
            })
        })
    })
}
