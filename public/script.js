async function fetchResponse(aiType) {
    const question = prompt('Posez une question :');
    if (!question) return;

    const response = await fetch(`/api/${aiType}?question=${encodeURIComponent(question)}&uid=1`);
    const data = await response.json();
    document.getElementById('response').innerText = data.response;
}
