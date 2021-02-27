import React from 'react';
import Webcam from "react-webcam";



const CameraFeed = () => {
  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);


  const postImage = async (url = '', data = {}) => {
    const formData = new FormData();
    formData.append("file", data);
    console.log('posting image')
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {},
      body: formData // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    await postImage('/upload', imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam
        ref={webcamRef}
        mirrored={true}
        audio={false}
        screenshotFormat="image/png"
        screenshotQuality={1}
        forceScreenshotSourceSize={true}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img alt=''
          src={imgSrc}
        />
      )}
    </>
  );
};

export default CameraFeed;
