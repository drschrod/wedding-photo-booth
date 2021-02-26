import React from 'react';
import Webcam from "react-webcam";
import * as fs from 'fs';

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
  };
  
  const CameraFeed = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      fs.writeFile('../images/test.png', imageSrc, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
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
            <img
            src={imgSrc}
            />
        )}
      </>
    );
  };

export default CameraFeed;
