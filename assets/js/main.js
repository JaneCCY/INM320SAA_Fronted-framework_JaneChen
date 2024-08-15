// Log title in the console
console.log('%cHeadlessCMS', 'background: blue; font-size:20px; color:white; font-family:arial');

// XHR to load JSON data
document.addEventListener('DOMContentLoaded', function () {
    // Create and send an XHR request to get the JSON data
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/data/content.json');
    xhr.send();

    // When the request finishes
    xhr.onload = function () {
        if (xhr.status === 200) { // Check if the status code is 200 (OK)
            try {
                console.log("JSON data retrieved:", xhr.responseText); // Log raw data
                const data = JSON.parse(xhr.responseText); // Parse JSON data
                console.log("Parsed JSON data:", data); // Log parsed data

                // Populate the Ticket Box
                document.querySelector('.ticket-text').textContent = data.ticketBox.title;
                document.querySelector('.view-details').textContent = data.ticketBox.viewDetailsText;
                document.querySelector('.groupSupport').textContent = data.ticketBox.groupSupportText;

                // Clear and fill Ticket Box content
                const ticketBoxContent = document.querySelector('.TicketBoxContent');
                ticketBoxContent.innerHTML = '';
                data.ticketBox.tickets.forEach(ticket => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.innerHTML = `${ticket.text}<span class="item-number">${ticket.number}</span>`;
                    ticketBoxContent.appendChild(listItem);
                });

                // Show an alert with ticket text when clicked
                ticketBoxContent.addEventListener('click', function (event) {
                    const listItem = event.target.closest('.list-group-item');
                    if (listItem) {
                        const itemText = listItem.textContent.trim(); // Get the full text of the list item
                        alert(itemText);
                    }
                });

                // Populate Task Box
                document.querySelector('.task-text').textContent = data.taskBox.title;
                document.querySelector('.view-all').textContent = data.taskBox.viewAllText;
                document.querySelector('.today').textContent = data.taskBox.todayText;

                // Clear and fill Task Box content with checkboxes
                const taskBoxContent = document.querySelector('.TaskBoxContent');
                taskBoxContent.innerHTML = ''; // Clear existing content
                data.taskBox.tasks.forEach((task, index) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.innerHTML = `
                        <input type="checkbox" id="task${index + 1}" name="task${index + 1}" value="${task.text}">
                        <label for="task${index + 1}">${task.text}</label>
                        <img src="assets/images/${task.icon}" alt="${task.text} Icon" class="checkIcon">
                    `;
                    taskBoxContent.appendChild(listItem);
                });

                // Populate and handle click events for status boxes
                const statusData = {
                    unresolved: 60,
                    overdue: 16,
                    open: 43,
                    onhold: 64
                };

                // Populate status boxes
                document.querySelectorAll('.titelText').forEach(element => {
                    const id = element.id;
                    if (statusData[id] !== undefined) {
                        element.querySelector('div').textContent = statusData[id];
                    }
                    // Add click event listener to show alert
                    element.addEventListener('click', function () {
                        const number = this.querySelector('div').textContent;
                        alert(`${number}!`);
                    });
                });

                // Populate Info Card 1
                const infoCard = data.infoCard;
                document.querySelector('.info-card .siteName').textContent = infoCard.siteName;
                document.querySelector('.info-card .name').textContent = infoCard.name;
                document.querySelector('.info-card .phone').textContent = infoCard.phone;
                document.querySelector('.info-card .address').textContent = infoCard.address;
                const mainNav1 = document.querySelector('.info-card .mainNav');
                mainNav1.innerHTML = '';
                infoCard.mainNav.forEach(nav => {
                    const link = document.createElement('a');
                    link.href = nav.url;
                    link.textContent = nav.text;
                    if (nav.newTab) {
                        link.target = '_blank';
                    }
                    mainNav1.appendChild(link);
                    mainNav1.appendChild(document.createElement('br')); // Add line break for each link
                });

                // Populate Info Card 2
                const infoCard2 = data.infoCard2;
                document.querySelector('.info-card2 .photo').innerHTML = `
                    <input type="checkbox" id="photoCheckbox" name="photoCheckbox">
                    <label for="photoCheckbox">${infoCard2.photo}</label>
                `;
                document.querySelector('.info-card2 .drawing').innerHTML = `
                    <input type="checkbox" id="drawingCheckbox" name="drawingCheckbox">
                    <label for="drawingCheckbox">${infoCard2.drawing}</label>
                `;
                document.querySelector('.info-card2 .edit').innerHTML = `
                    <input type="checkbox" id="editCheckbox" name="editCheckbox">
                    <label for="editCheckbox">${infoCard2.edit}</label>
                `;
                document.querySelector('.info-card2 .music').innerHTML = `
                    <input type="checkbox" id="musicCheckbox" name="musicCheckbox">
                    <label for="musicCheckbox">${infoCard2.music}</label>
                `;
                const mainNav2 = document.querySelector('.info-card2 .mainNav');
                mainNav2.innerHTML = '';
                infoCard2.mainNav.forEach(nav => {
                    const link = document.createElement('a');
                    link.href = nav.url;
                    link.textContent = nav.text;
                    if (nav.newTab) {
                        link.target = '_blank';
                    }
                    mainNav2.appendChild(link);
                    mainNav2.appendChild(document.createElement('br')); // Add line break for each link
                });

                // Handle notification click sound
                const notificationIcon = document.getElementById('notificationIcon');
                const notificationSound = new Audio('/assets/sound/notification-sound.wav');  // Load sound file
                notificationIcon.addEventListener('click', function () {
                    notificationSound.play(); // Play sound on click
                });

            } catch (error) {
                console.warn(`Error parsing JSON: ${error}`);
            }
        } else {
            console.warn(`Request failed. Status: ${xhr.status}`);
        }
    };

    // Log a warning if the request fails
    xhr.onerror = function () {
        console.warn('Request failed');
    };
});
