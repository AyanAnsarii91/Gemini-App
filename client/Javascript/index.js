// 🌍 Setting BASE_URL depending on environment
const BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://gemini-app-8572.onrender.com";

// ⚡ Main function to generate image from prompt
async function generateImage() {
  const userPrompt = document.getElementById("userPrompt").value;

  if (!userPrompt) {
    alert("Please enter a prompt!");
    return;
  }

  // Show loading status
  document.getElementById("status").innerText = "Generating... Please wait...";

  try {
    const response = await fetch(`${BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (response.ok) {
      const data = await response.json();

      // 🖼️ Update image element
      const imageElement = document.getElementById("aiImage");
      imageElement.src = `data:image/png;base64,${data.image}`;
      imageElement.style.display = "block";

      // ✅ Update status
      document.getElementById("status").innerText = "Image generated!";

      // 📥 Show and configure download button
      const downloadBtn = document.getElementById("downloadBtn");
      downloadBtn.style.display = "inline-block";
      downloadBtn.onclick = function () {
        const link = document.createElement("a");
        link.href = imageElement.src;
        link.download = "generated-image.png";
        link.click();
      };
    } else {
      // ❌ Server responded but with error
      document.getElementById("status").innerText = "Failed to generate image.";
      console.error("❌ Server Error:", await response.text());
    }
  } catch (error) {
    // ❌ Network/server fetch error
    console.error("❌ Fetch Error:", error);
    document.getElementById("status").innerText = "Error connecting to server.";
  }
}

// 🚀 Helper function to set predefined prompt
function setPrompt(prompt) {
  document.getElementById("userPrompt").value = prompt;
  generateImage();
}
