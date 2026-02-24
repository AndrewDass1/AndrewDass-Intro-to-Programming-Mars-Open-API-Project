fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41')
.then(response => {return response.json()})
.then( data => console.log(data))
.catch( error => console.log("Error"));