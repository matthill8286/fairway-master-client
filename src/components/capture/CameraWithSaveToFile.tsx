import React, { useRef } from "react";
import Webcam from "react-webcam";

const Camera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const captureImage = () => {
    const imageSrc = webcamRef?.current?.getScreenshot();

    try {
      if (imageSrc) {
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = "captured-image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Failed to capture image");
      }
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={captureImage}>Capture</button>
    </div>
  );
};

export default Camera;
