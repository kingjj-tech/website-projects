
const table = document.getElementById('downloadTable');
const downloadButton = document.getElementById('downloadButton');


function tableToText(table) {
    let text = '';


    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            text += row.cells[j].textContent;
            if (j < row.cells.length - 1) {
                text += '\t';
            }
        }
        text += '\n';
    }

    return text;
}


function downloadTable() {
    const tableText = tableToText(table);


    const blob = new Blob([tableText], { type: 'text/plain' });


    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Timetable.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


downloadButton.addEventListener('click', downloadTable);


function updateClock() {
    const clockElement = document.getElementById('clock');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const timeString = `${hours}:${minutes}:${seconds}`;
    clockElement.textContent = timeString;
}


setInterval(updateClock, 1000);


updateClock();
