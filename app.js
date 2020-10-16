window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;



            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=fafb76970ab6ce5206fb335407805f52`;

            fetch(api).then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp} = data.current;
                
                //set DOM Elements from the API
                temperatureDegree.textContent = (temp * 9/5 -459.67).toFixed(2);
                temperatureDescription.textContent = data.current.weather[0].description;
                locationTimezone.textContent = data.timezone;

                let celsius =  temp - 273.15

                //change temp to C or F

                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = celsius.toFixed(2);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = (temp * 9/5 -459.67).toFixed(2);
                    }
                });
                // colour palette changes depending on the temperature
                if(celsius < 0){
                    document.body.style.background = "linear-gradient(#4BB3FD, #3E6680)";
                }
                else if(celsius < 20){
                    document.body.style.background = "linear-gradient(#48ACF0, #87C38F)";
                }
                else if(celsius < 30){
                    document.body.style.background = "linear-gradient(#52FFB8, #539987)";
                }
                else if(celsius < 35){
                    document.body.style.background = "linear-gradient(#F78764, #C47335)";
                }
                else{
                    document.body.style.background = "linear-gradient(#881600, #F8333C)";
                }
            })
        });

       
    }
})