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

                // Handle notification click sound
                const notificationIcon = document.getElementById('notificationIcon');
                if (notificationIcon) {
                    const notificationSound = new Audio('assets/sounds/notification-sound.wav'); 
                    notificationIcon.addEventListener('click', function () {
                        notificationSound.play(); // Play sound on click
                    });
                } else {
                    console.warn('Notification icon not found');
                }

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
