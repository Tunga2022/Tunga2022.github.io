document.addEventListener('DOMContentLoaded', () => {
    let menu = document.querySelector('.nav_menu');
    let menu_toggle = document.querySelector('.mobile-menu-icon');
    let menu_toggle_icon = document.querySelector('.mobile-menu-icon ion-icon');
    menu_toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        menu.classList.contains('active') ?
            menu_toggle_icon.setAttribute('name', 'close-outline') :
            menu_toggle_icon.setAttribute('name', 'menu-outline');
    });
    // count-down-start
    let days = document.querySelector('.days');
    let hours = document.querySelector('.hours');
    let minutes = document.querySelector('.minutes');
    let seconds = document.querySelector('.seconds');
    const start = new Date('2023-06-24 16:00:00Z').getTime();

    function time() {
        requestAnimationFrame(time);
        const current = new Date().getTime();
        const remaining = start - current;
        let totalDay = Math.floor(remaining / 1000 / 60 / 60 / 24);
        let totalHour = Math.floor((remaining / 1000 / 60 / 60) % 24);
        let totalMin = Math.floor((remaining / 1000 / 60) % 60);
        let totalSec = Math.floor((remaining / 1000) % 60);
        days.innerText = `${totalDay < 10 ? '0' + totalDay : totalDay}`;
        hours.innerText = `${totalHour < 10 ? '0' + totalHour : totalHour}`;
        minutes.innerText = `${totalMin < 10 ? '0' + totalMin : totalMin}`;
        seconds.innerText = `${totalSec < 10 ? '0' + totalSec : totalSec}`;
        if (remaining < 0) {
            document.querySelector('.worldcup-count-down').innerHTML = `
         <h3 class="running">World cup is running</h3>   
         `;
            cancelAnimationFrame(time);
        }
    }
    time();
    // count-down-end
});

async function fetchMatch() {
    let loader = document.querySelector('.loader');
    let points_wrapper = document.querySelector('.points-container');
    let url = '';
    let points = await fetch(url);

    if (points.ok) {
        setTimeout(async() => {
                    loader.remove();
                    let points_response = await points.json();
                    points_response.map((groups) => {
                                let sor = groups.teams.sort((a, b) => {
                                    return a.position - b.position;
                                });
                                points_wrapper.innerHTML += `
            <div class="points-table">
            <h1 class="group-heading">${groups.group}</h1>
            <table>
            <thead>
                <tr>
                    <th>Team</th>
                    <th>MP</th>
                    <th>L</th>
                    <th>D</th>
                    <th>W</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
            ${sor
              .map(
                (team) =>
                  `<tr>
                <td>
                <div class="d-a">
                <img src="${team.flag}" alt="${team.Team}" class="team-flag" /> 
                  <span>${team.flag
                    .split('/')
                    .join('')
                    .split('.png')
                    .join('')}
                    </span>
                </div>
                </td>
                <td>${team.match_play}</td>
                <td>${team.loss}</td>
                <td>${team.draw}</td>
                <td>${team.win}</td>
                <td>${team.points}</td>
                </tr>`
              )
              .join('')}
            </tbody>
            </table>
            </div>
           `;
      });
    }, 1000);
  }
}
fetchMatch();