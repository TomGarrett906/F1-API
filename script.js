
console.log('F1 Racer Api')

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('f1-form');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const seasonInput = document.getElementById('season');
      const roundInput = document.getElementById('round');
      const season = seasonInput.value;
      const round = roundInput.value;
      
      try {
          const data = await getData(season, round);
          console.log(data)
          createTable(data);
      } catch (error) {
          console.error('Error:', error);
      }
  });

  async function getData(season, round) {
      const url = `https://ergast.com/api/f1/${season}/${round}/driverStandings.json?authuser=0`;
      const res = await fetch(url);
      console.log(url)

      if (res.ok) {
          return await res.json();
      } else {
          throw new Error('Bad request');
      }
  }

  function createTable(data) {
       console.log(data) 
      const tableBody = document.querySelector('#f1-table tbody');
      tableBody.innerHTML = '';
      if (data.MRData.StandingsTable.StandingsLists.length > 0) {
          const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
          
          standings.slice(0, 20).forEach((driver, i) => {
              const row = tableBody.insertRow();
              row.insertCell(0).textContent = i + 1;
              row.insertCell(1).textContent = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
              row.insertCell(2).textContent = driver.Constructors[0].name;
              row.insertCell(3).textContent = driver.points;
          });
      } else {
          const row = tableBody.insertRow();
          const cell = row.insertCell(0);
          cell.setAttribute('colspan', '4');
          cell.textContent = 'Grand Prix Doesn\'t Exist';
      }
  }
}); 