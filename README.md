# Face Recognition Login Sample

This repository contains a basic example of how to set up a web page where a user logs in via face recognition. The example uses [face-api.js](https://github.com/justadudewhohacks/face-api.js) and runs entirely in the browser.

The demo is minimal and intended for instructional purposes only. In a real application you would want to add a secure backend and properly manage user registration and biometric data.

## Files

- `login.html` – HTML for the login page
- `main.js` – JavaScript that loads the models and performs face comparison
- `reference.jpg` – Reference image of the authorized user (replace with your own image)

## Running the demo

1. Copy an image of the authorized user to `reference.jpg` in this folder.
2. Open `login.html` in a modern browser. The page will ask to access your webcam.
3. Click **Login**. If the face detected from the webcam matches `reference.jpg`, a success message is displayed.

The example uses models hosted on a CDN. If you want to run offline, download the models from the face-api.js repository and adjust the URLs in `main.js` accordingly.
