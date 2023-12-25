// All necessary information
const openAIapiKey = "";
const openAIapiUrl = "https://api.openai.com/v1/completions";
const googleapiKey = "";
const googleClientID = "";

// Provide the input to OpenAI and process it. The AI returns a response that formats the data for createCalendarEvent function.
const processInput = async () => {
  let userInput = document.getElementById("userInput").value;
  let prompt = `Given the prompt '${userInput}', find the start date, endDate, event title, location, and create a short description for the event without all the logistical data. For the date format it like YYYY-MM-DDTHH:mm:ss-08:00. Comma separate the values. Don't include what they are.`;
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
    const completedText = data.choices[0].text;

    createCalendarEvent(completedText);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Takes in event details, formatted by OpenAI API, and then provides the data into url to create a Google Calendar event, allowing option for user to continue editing.
function createCalendarEvent(eventDetails) {
    // eventDetails is returned as CSV as advised by prompt. Use split to get all the data.
    const dataArray = eventDetails.split(',');
    const fixedDate = dataArray[0].replace(/\n/g, '')

    const startDate = new Date(fixedDate);
    const endDate = new Date(dataArray[1]);
    const title = dataArray[2];
    const location = dataArray[3];
    const description = dataArray[4];

    const formattedStartDate = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const formattedEndDate = endDate.toISOString().replace(/-|:|\.\d+/g, '');

    const url = `https://calendar.google.com/calendar/r/eventedit?dates=${formattedStartDate}/${formattedEndDate}&text=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(description)}`;

    chrome.tabs.create({ url: url });
}


// A listener to wait for prompt submission button
document.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", function () {
    processInput();
  });
});
