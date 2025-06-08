const OPENAI_API_KEY = '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'; // Replace with your real key

async function getResponse(type) {
  const input = document.getElementById("videoIdea").value;
  const outputArea = document.getElementById("outputArea");
  outputArea.innerHTML = "⏳ Generating...";

  let prompt = "";

  switch (type) {
    case "title":
      prompt = `Generate an attention-grabbing YouTube title in Hindi-English mix for this idea: "${input}"`;
      break;
    case "hashtags":
      prompt = `Create a comma-separated list of trending YouTube hashtags for this video idea: "${input}"`;
      break;
    case "description":
      prompt = `Write a short, engaging YouTube video description for this idea: "${input}"`;
      break;
    case "thumbnail":
      prompt = `Suggest 2 catchy thumbnail text ideas (less than 10 words each) for this video: "${input}"`;
      break;
    default:
      return;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8
    })
  });

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content || "Something went wrong.";
  outputArea.innerText = result;
}
