const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() {
  const { videoWidth: width, videoHeight: height } = video;
  canvas.width = width;
  canvas.height = height;
  console.log(width, height);

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.1;

    ctx.putImageData(pixels, 0, 0);
  }, 16)
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('images/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'sexy');
  link.innerHTML = `<img src=${data} alt='Sexy girl' />`
  strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

function redEffect(pixels) {
  for (let i=0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 100;  //red
    pixels.data[i + 1] = pixels.data[i + 1] + 50;  //green
    pixels.data[i + 2] = pixels.data[i + 2] + 0.5;  //blue
  }

  return pixels;
}

function rgbSplit(pixels) {
  for (let i=0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0];  //red
    pixels.data[i + 100] = pixels.data[i + 1];  //green
    pixels.data[i - 150] = pixels.data[i + 2];  //blue
  }

  return pixels;
}

function greenScreen(pixels) {
  
}