let qrcode;
const qrCodeContainer = document.getElementById("qrcode-container");
const downloadLink = document.getElementById("download-link");
const generateButton = document.getElementById("generate-button");
const inputElement = document.getElementById("qr-input");

let isQRCodeGenerated = false;

function generateOrClearQRCode() {
    const inputText = inputElement.value;

    if (isQRCodeGenerated || inputText.trim() === "") {
        clearQRCode();
        isQRCodeGenerated = false;
        if (inputText.trim() === "") {
            inputElement.classList.add("shake"); // Add shake animation class
            setTimeout(() => {
                inputElement.classList.remove("shake"); // Remove the class after the animation
            }, 500);
        }
    } else {
        generateQRCode();
        isQRCodeGenerated = true;
    }
}

function generateQRCode() {
    const inputText = document.getElementById("qr-input").value;
    const qrcodeElement = document.getElementById("qrcode");

    // Clear any previous QR code and hide download link
    qrcodeElement.innerHTML = "";
    downloadLink.classList.add("hidden");

    if (inputText !== "") {
        qrcode = new QRCode(qrcodeElement, {
            text: inputText,
            width: 128,
            height: 128
        });

        // Show download link and trigger the fade-in effect
        downloadLink.href = canvasToImage(qrcode._el.querySelector("canvas"));
        downloadLink.download = "qrcode.png";
        downloadLink.classList.remove("hidden");
        qrCodeContainer.classList.add("fade-in");
        generateButton.textContent = "Clear QR Code";
    } else {
        alert("Please enter text or URL");
    }
}

function clearQRCode() {
    const qrcodeElement = document.getElementById("qrcode");
    qrcodeElement.innerHTML = "";
    downloadLink.classList.add("hidden");
    generateButton.textContent = "Generate QR Code";
}

function canvasToImage(canvas) {
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image.src;
}
