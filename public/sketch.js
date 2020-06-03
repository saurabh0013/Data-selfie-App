function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160, 120);
    
    let lat, lon;
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
      const moods = document.getElementById('mood')
      const mood = moods.value;
      
      moods.addEventListener('keydown', event => { 
                  if (event.keyCode === 13)
                      button.click(); 
                  }); 
      video.loadPixels();
      const image64 = video.canvas.toDataURL();
      const data = { lat, lon, mood, image64 };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const response = await fetch('/api', options);
      const json = await response.json();
      console.log(json);
     
    });
    

    if ('geolocation' in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);
        document.getElementById('latitude').textContent = lat.toFixed(2);
        document.getElementById('longitude').textContent = lon.toFixed(2);
        

      });
    } else {
      console.log('geolocation not available');
    }
  }