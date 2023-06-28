import React, { useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const CameraWithBE: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const captureImage = async () => {
    const imageSrc = webcamRef?.current?.getScreenshot();

    try {
      if (imageSrc) {
        const result = await axios.post(process.env.BACKEND_API_URL!, {
          image: imageSrc,
        });

        console.log(result.data);
      } else {
        console.error("Failed to capture image");
      }
    } catch (err) {
      console.error("Failed to upload image", err);
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={captureImage}>Capture</button>
    </div>
  );
};

export default CameraWithBE;
