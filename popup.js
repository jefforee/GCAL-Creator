// All necessary information
const openAIapiKey = "FILL";
const openAIapiUrl = "https://api.openai.com/v1/chat/completions";
const googleapiKey = "FILL";
const googleClientID = "FILL";


// Provide the input to OpenAI and process it. The AI returns a response that formats the data for createCalendarEvent function.
const processInput = async () => {
  let userInput = document.getElementById("userInput").value;
  let prompt = `Given the prompt ${userInput}, find the start date, endDate, event title, location, and create a short and fun description for the event . Format the date as YYYY-MM-DDTHH:mm:ss-08:00. Format the response as comma separate the values. Default the year to 2024 if not specified. Default the endDate to be startDate plus 2 hours if not specified or else write 'N/A'. Assume dates are given my 'month/day'. `;
  console.log("Calling GPT3");

  try {
    const response = await fetch(openAIapiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAIapiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{role: "user", content: prompt}],
        max_tokens: 2048,
        temperature: 0.2,
        n: 1,
        stop: null
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const completedText = data.choices[0].message.content.trim();

    createCalendarEvent(completedText);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Takes in event details, formatted by OpenAI API, and then provides the data into url to create a Google Calendar event, allowing option for user to continue editing.
function createCalendarEvent(eventDetails) {
    console.log(eventDetails);
    // eventDetails is returned as CSV as advised by prompt. Use split to get all the data.
    const dataArray = eventDetails.split(',');
    const fixedDate = dataArray[0].replace(/\n/g, '')

    if (fixedDate == "N/A" || dataArray[1] == "N/A") {
        alert("Provide a date please.")
        return
    }
    console.log(fixedDate); 
    console.log(dataArray[1]);
    const startDate = new Date(fixedDate);
    const endDate = new Date(dataArray[1].trim());
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
