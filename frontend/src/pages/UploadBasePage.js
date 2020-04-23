import React from 'react';
import Menu from '../components/misc/menu/index';
import Background from '../components/misc/background/index';
import UploadCard from '../components/base-upload/cardUpload/index';


const UploadBasePage = () => {
    return(
        <>
            <Menu />
            <Background />
            <UploadCard />
        </>
    )
};

export default UploadBasePage;