async function setupModels() {
    const modelUrl = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl);
    await faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl);
}

async function loadReferenceImage() {
    const img = await faceapi.fetchImage('reference.jpg');
    const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    if (!detection) throw new Error('No face in reference image');
    return detection.descriptor;
}

async function startVideo() {
    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;
    return new Promise(resolve => { video.onloadedmetadata = () => resolve(video); });
}

async function main() {
    await setupModels();
    const referenceDescriptor = await loadReferenceImage();
    const video = await startVideo();
    document.getElementById('login').onclick = async () => {
        const result = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
        if (!result) {
            document.getElementById('status').innerText = 'No face detected';
            return;
        }
        const distance = faceapi.euclideanDistance(referenceDescriptor, result.descriptor);
        if (distance < 0.6) {
            document.getElementById('status').innerText = 'Login successful';
        } else {
            document.getElementById('status').innerText = 'Face not recognized';
        }
    };
}

main();
