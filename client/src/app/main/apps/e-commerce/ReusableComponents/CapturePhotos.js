import { IconButton } from '@material-ui/core';
import ImageCapture from 'react-image-data-capture';
import React, { useCallback, useMemo, useState } from 'react';
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';

const CapturePhotos = (props) => {
  const { onCapture, showImgCapture } = props;

  const [cameraFacingMode, setCameraFacingMode] = useState('environment');

  const toggleCameraFacingMode = () => {
    setCameraFacingMode(prevMode =>
      prevMode === 'environment' ? 'user' : 'environment'
    );
  };

  const config = useMemo(() => (
    {
      video: { facingMode: cameraFacingMode },
    }
  ), [cameraFacingMode]);

  let imgFile = null;

  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  const formData = new FormData();
  formData.append('file', imgFile);

  return (
    <>
      {showImgCapture && (
        <>
          <ImageCapture
            onCapture={onCapture}
            onError={onError}
            width={600}
            userMediaConfig={config}
          />
          <div className='flex flex-row w-full justify-center'>
            <IconButton onClick={toggleCameraFacingMode}>
              <SwitchCameraIcon />
            </IconButton>
          </div>
        </>
      )}
    </>
  );
};

export default CapturePhotos;
