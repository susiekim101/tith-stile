/*const ImageSummary = async (prompt) => {
    const res = await fetch('http://localhost:5000/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({prompt}),
    });
    const data = await res.json();
    return`data:image/png;base64,${data.base64}`;
};

export default ImageSummary;*/