let net;

async function app() {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');

    const imageUpload = document.getElementById('imageUpload');
    const classifyButton = document.getElementById('classifyButton');
    const result = document.getElementById('result');
    const image = document.getElementById('image');

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            image.src = reader.result;
            image.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    classifyButton.addEventListener('click', async () => {
        if (image.src) {
            result.innerText = 'Classifying...';
            const predictions = await net.classify(image);
            const humanPrediction = predictions.find(prediction => prediction.className.includes('person') || prediction.className.includes('man') || prediction.className.includes('woman'));
            if (humanPrediction) {
                result.innerText = `Human detected with probability: ${humanPrediction.probability.toFixed(2)}`;
            } else {
                result.innerText = 'No human detected in the image.';
            }
        } else {
            result.innerText = 'Please upload an image first.';
        }
    });
}

app();
