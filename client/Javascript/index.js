async function generateImage() {
  const userPrompt = document.getElementById("userPrompt").value;

  if (!userPrompt) {
    alert("Please enter a prompt!");
    return;
  }

  // Update status
  document.getElementById("status").innerText = "Generating... Please wait...";

  // Make API request with the custom user prompt
  const response = await fetch("http://localhost:5000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: userPrompt }),
  });

  if (response.ok) {
    const data = await response.json();
    const imageElement = document.getElementById("aiImage");
    imageElement.src = `data:image/png;base64,${data.image}`;
    imageElement.style.display = "block";

    // Show status
    document.getElementById("status").innerText = "Image generated!";

    // Show and configure download button
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.style.display = "inline-block";
    downloadBtn.onclick = function () {
      const link = document.createElement("a");
      link.href = imageElement.src;
      link.download = "generated-image.png";
      link.click();
    };
  } else {
    document.getElementById("status").innerText = "Failed to generate image.";
  }
}
