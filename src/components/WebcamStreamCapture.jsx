import React, { useEffect, useRef } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        // Request access to the user's camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Display the camera stream in a video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    // Clean up the camera stream when the component unmounts
    return () => {
      const videoElement = videoRef.current;

      if (videoElement) {
        const stream = videoElement.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, []); // Run the effect only once when the component mounts

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      {/* Add buttons or controls for capturing pictures or recording video */}
    </div>
  );
};

export default CameraComponent;
