

const processInput = async () => {
  let userInput = document.getElementById("userInput").value;
  let prompt = `Given the prompt '${userInput}', find the start date, endDate, event title, location, and create a short description for the event without all the logistical data. For the date format it like YYYY-MM-DDTHH:mm:ss-08:00. Comma separate the values.`;
  console.log("Calling GPT3");

  try {
    const response = await fetch(openAIapiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAIapiKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        temperature: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const completedText = data.choices[0].text;
    alert(completedText);
    console.log(completedText);
  } catch (error) {
    console.error("Error:", error);
  }
};

// function initClient() {
//     // Load the API client and sign in the user
//     gapi.client.init({
//       apiKey: googleapiKey,
//       clientId: googleClientID,
//       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//       scope: 'https://www.googleapis.com/auth/calendar.events',
//     }).then(function () {
//       // Call the function to create an event once the client is initialized
//       createEvent();
//     });
// }

// function createEvent() {
//   // Get the current date and time
//   const now = new Date();
//   const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

//   // Create a new event
//   const event = {
//     'summary': 'Event Title',
//     'description': 'Event Description',
//     'start': {
//       'dateTime': now.toISOString(),
//       'timeZone': 'UTC',
//     },
//     'end': {
//       'dateTime': oneHourLater.toISOString(),
//       'timeZone': 'UTC',
//     },
//   };

//   // Use the Calendar API to create the event
//   gapi.client.calendar.events.insert({
//     'calendarId': 'primary', // Use 'primary' for the user's default calendar
//     'resource': event,
//   }).then(function (response) {
//     console.log('Event created:', response.result);
//   }).catch(function (error) {
//     console.error('Error creating event:', error);
//   });
// }

  
//   // Load the API client and auth2 library
// gapi.load('client:auth2', initClient);
  
// document.getElementById('createEvent').addEventListener('click', createEvent);

// function createEvent() {
//   chrome.identity.getAuthToken({ interactive: true }, function (token) {
//     if (chrome.runtime.lastError || !token) {
//       console.error('Error getting authorization token:', chrome.runtime.lastError);
//       return;
//     }

//     const now = new Date();
//     const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

//     const event = {
//       'summary': 'Event Title',
//       'description': 'Event Description',
//       'start': {
//         'dateTime': now.toISOString(),
//         'timeZone': 'UTC',
//       },
//       'end': {
//         'dateTime': oneHourLater.toISOString(),
//         'timeZone': 'UTC',
//       },
//     };

//     fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
//       method: 'POST',
//       headers: {
//         'Authorization': 'Bearer ' + token,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(event),
//     })
//     .then(response => response.json())
//     .then(data => console.log('Event created:', data))
//     .catch(error => console.error('Error creating event:', error));
//   });
// }

document.getElementById('createEvent').addEventListener('click', openCalendarPopup);

function openCalendarPopup() {
    const startDate = new Date('2023-12-25T13:00:00-08:00');
    const endDate = new Date('2023-12-25T14:00:00-08:00');
    const title = 'Christmas Event';
    const location = 'Your Location';
    const description = 'Celebrate Christmas!';

    const formattedStartDate = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, '');

    const url = `https://calendar.google.com/calendar/r/eventedit?dates=${formattedStartDate}/${formattedEndDate}&text=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(description)}`;

    chrome.tabs.create({ url: url });
}






// chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
//     console.log(token);

//     const event = {
//         'summary': 'Event Title',
//         'description': 'Event Description',
//         'start': {
//             'dateTime': '2024-01-01T10:00:00',
//             'timeZone': 'UTC',
//         },
//         'end': {
//             'dateTime': '2024-01-01T12:00:00',
//             'timeZone': 'UTC',
//         },
//     };

//     const headers = new Headers({
//         'Authorization': 'Bearer ' + token,
//         'Content-Type': 'application/json',
//     });

//     const queryParams = {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(event),
//     };

//     fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
//         .then(response => response.json())
//         .then(function(data) {
//             console.log('Event created:', data);
//             // Do whatever you need with the data!
//         })
//         .catch(error => {
//             console.error('Error creating event:', error);
//         });
// });



document.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", function () {
    processInput();
  });
});
