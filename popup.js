const openAIapiKey = "None";
const openAIapiUrl = "https://api.openai.com/v1/completions";
const googleapiKey = "None";
const googleClientID = "944690984731-oadlt5ppa7j3n6ifb1iq00mnke2ma463.apps.googleusercontent.com";

const processInput = async () => {
  let userInput = document.getElementById("userInput").value;
  let prompt = `What is 5 + ${userInput}`;
  console.log("Calling GPT3");

  try {
    const response = await fetch(apiUrl, {
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
  
document.getElementById('createEvent').addEventListener('click', createEvent);

function createEvent() {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (chrome.runtime.lastError || !token) {
      console.error('Error getting authorization token:', chrome.runtime.lastError);
      return;
    }

    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const event = {
      'summary': 'Event Title',
      'description': 'Event Description',
      'start': {
        'dateTime': now.toISOString(),
        'timeZone': 'UTC',
      },
      'end': {
        'dateTime': oneHourLater.toISOString(),
        'timeZone': 'UTC',
      },
    };

    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
    .then(response => response.json())
    .then(data => console.log('Event created:', data))
    .catch(error => console.error('Error creating event:', error));
  });
}


document.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", function () {
    processInput();
  });
});
