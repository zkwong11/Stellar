// Fetch with Async/Await 
async function getInfo(term="Malaysia") {
    const apiKey = '39457d86f173699cf7ec19cea6cadbf3';
    let uri = `http://api.openweathermap.org/data/2.5/weather?q=${term}&units=metric&APPID=${apiKey}`;

    let req = new Request(uri, {
        method: 'GET',
        mode: 'cors'
    });

    try {
        let response = await fetch(req);
        let data = await response.json();
  
        generalInfo(data);

        document.querySelector(".user-location").innerHTML = `
            &rarr; ${term}
        `;

    } catch(err) {
        console.log(err);
        alert("City not found");
    }
};
getInfo();

async function getNews(term = "Malaysia") {
    let uri = `https://newsapi.org/v2/everything?q=${term}&apiKey=91c4711bc08247559575d5c6c3cd4dfa`;

    let req = new Request(uri, {
        method: 'GET',
        mode: 'cors'
    });

    try {
        let response = await fetch(req);
        let dataNews = await response.json();
        console.log(dataNews);
        generalNews(dataNews);
        
    } catch(err) {
        console.log(err);
    }
};
getNews();

generalNews = (dataNews) => {

    for(let i = 0; i<4; i++) {
        let titleNews = dataNews.articles[i].title;
        let dateNews = dataNews.articles[i].publishedAt;
        let descNews = dataNews.articles[i].description;
        let linkNews = dataNews.articles[i].url;
        // let imageNews = dataNews.articles[i].urlToImage;
        document.getElementById(`c-header${i}`).innerHTML = titleNews;
        document.getElementById(`c-date${i}`).innerHTML = "Published at: " + dateNews.slice(0,10);
        document.getElementById(`c-desc${i}`).innerHTML = descNews;
        document.getElementById(`c-link${i}`).href = linkNews;
        // document.getElementById(`c-image${i}`).src = imageNews;
    };

    let i = 0;
    document.querySelector(".fa-chevron-circle-right").addEventListener("click", function() {
        if(i>15){i = -1};

        i++;
        titleNews = dataNews.articles[i].title;
        dateNews = dataNews.articles[i].publishedAt;
        descNews = dataNews.articles[i].description;
        linkNews = dataNews.articles[i].url;    
        
        document.getElementById(`c-header0`).innerHTML = titleNews;
        document.getElementById(`c-date0`).innerHTML = "Published at: " + dateNews.slice(0,10);
        document.getElementById(`c-desc0`).innerHTML = descNews;
        document.getElementById(`c-link0`).href = linkNews;

        i++;
        titleNews = dataNews.articles[i].title;
        dateNews = dataNews.articles[i].publishedAt;
        descNews = dataNews.articles[i].description;
        linkNews = dataNews.articles[i].url;  

        document.getElementById(`c-header1`).innerHTML = titleNews;
        document.getElementById(`c-date1`).innerHTML = "Published at: " + dateNews.slice(0,10);
        document.getElementById(`c-desc1`).innerHTML = descNews;
        document.getElementById(`c-link1`).href = linkNews;

        i++;
        titleNews = dataNews.articles[i].title;
        dateNews = dataNews.articles[i].publishedAt;
        descNews = dataNews.articles[i].description;
        linkNews = dataNews.articles[i].url; 

        document.getElementById(`c-header2`).innerHTML = titleNews;
        document.getElementById(`c-date2`).innerHTML = "Published at: " + dateNews.slice(0,10);
        document.getElementById(`c-desc2`).innerHTML = descNews;
        document.getElementById(`c-link2`).href = linkNews;

        i++;
        titleNews = dataNews.articles[i].title;
        dateNews = dataNews.articles[i].publishedAt;
        descNews = dataNews.articles[i].description;
        linkNews = dataNews.articles[i].url; 

        document.getElementById(`c-header3`).innerHTML = titleNews;
        document.getElementById(`c-date3`).innerHTML = "Published at: " + dateNews.slice(0,10);
        document.getElementById(`c-desc3`).innerHTML = descNews;
        document.getElementById(`c-link3`).href = linkNews;

        console.log(i);
    });
};


// Main Display
generalInfo = (data) => {
    let tempMain = data.main.temp;
    let tempMin = data.main.temp_min;
    let tempMax = data.main.temp_max;
    let weatherMain = data.weather[0].main;
    let weatherDesc = data.weather[0].description;
    let humid = data.main.humidity;
    let pressure = data.main.pressure;
    let windSpeed = data.wind.speed;
    let weatherIcon = data.weather[0].icon;

    document.querySelector(".main-temp").innerHTML = tempMain + " &deg;C";
    document.querySelector(".range-temp").innerHTML = `Temperature Range: ${tempMin} ~ ${tempMax}`;
    document.querySelector(".temp-desc").innerHTML = `
        Weather: ${weatherMain} &rarr; ${weatherDesc}.
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" style="float: right">
    `;
    document.querySelector(".the-detailed-info").innerHTML = `
        Humidity: ${humid}% <br> 
        Wind Speed: ${windSpeed}m/s<br>
        Pressure: ${pressure}hPa
    `;

    settingsConfig(tempMain);
}

// Search Bar Functionality
searchInfo = () => {
    let term = "";

    document.querySelector(".search").addEventListener("keyup", function(e) {
        term = e.target.value;
    });
    document.querySelector(".search__button").addEventListener("click", function(){
        getInfo(term);
        getNews(term);
    });
};
searchInfo();


// Side Panel Settings
settingsConfig = (tempMain) => {
    // To Fahrenheit
    document.querySelector(".fahrenheit").addEventListener("click", function(){
        FahrTempMain = `${((tempMain*1.8)+32)} &deg;F`;
        document.querySelector(".main-temp").innerHTML = FahrTempMain;
    });
    // To Celsius
    document.querySelector(".celsius").addEventListener("click", function(){
        document.querySelector(".main-temp").innerHTML = tempMain + " &deg;C";
    });

};

