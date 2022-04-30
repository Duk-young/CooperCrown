import React, { useState, useCallback, useMemo } from 'react';

import ImageCapture from 'react-image-data-capture';

const CapturePhotos = (props) => {
  const { onCapture, showImgCapture } = props;

  const config = useMemo(() => ({ video: true }), []);
  /*
    { video: true } - Default Camera View
    { video: { facingMode: environment } } - Back Camera
    { video: { facingMode: "user" } } - Front Camera
  */
  const [imgSrc, setImgSrc] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  // imgFile can be used as a file upload form submission
  const formData = new FormData();
  formData.append('file', imgFile);

  return (
    <>
      {showImgCapture && (
        <ImageCapture
          onCapture={onCapture}
          onError={onError}
          width={600}
          userMediaConfig={config}
        />
      )}
    </>
  );
};

export default CapturePhotos;
