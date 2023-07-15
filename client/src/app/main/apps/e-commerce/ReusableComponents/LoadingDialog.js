import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import React from 'react';

const LoadingDialog = () => {
  return (
    <div className='transparent-div'>
      <div className="centered-component">
        <FuseLoading loadingColor='white' />
      </div>
    </div>
  );
};

export default LoadingDialog;
