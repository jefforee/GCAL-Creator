const apiKey = "Hidden"
const apiUrl = "https://api.openai.com/v1/completions";

const processInput = async () => {
  let userInput = document.getElementById("userInput").value;
  let prompt = `What is 5 + ${userInput}`;
  console.log("Calling GPT3");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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

document.addEventListener("DOMContentLoaded", function () {
  var submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", function () {
    processInput();
  });
});
