getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('p');
    const mood = document.createElement('div');
    const geo = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');

    mood.style = "font-family:'Satisfy'; font-size: 20px";
    mood.textContent = `Mood: ${item.mood}`;
    geo.style = "font-family:'Handlee'; font-size: 15px";
    geo.textContent = `Latitude: ${item.lat.toFixed(2)}°, Longitude : ${item.lon.toFixed(2)}°`;
    
    const dateString = new Date(item.timestamp).toLocaleString();
    date.style = "font-family: 'Economica"
    date.textContent = `Time : ${dateString}`;
    image.src = item.image64;
    image.alt = "image"
    

    root.append(mood, geo, date, image);
    document.body.append(root);
  }

}