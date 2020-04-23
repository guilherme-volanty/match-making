import React from 'react'
import Menu from '../components/misc/menu/index';
import Background from '../components/misc/background/index';
import CarFilter from '../components/base-upload/carSearchFilter/index' ;

const SearchBasePage = () => {
    return (
        <>
            <Menu />
            <Background />
            <CarFilter />
        </>
    )
};

export default SearchBasePage;
