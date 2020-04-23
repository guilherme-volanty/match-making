import React from 'react'
import Menu from '../components/misc/menu/index';
import Background from '../components/misc/background/index';
import FilterTableCRUD from '../components/match-upload/table/index' ;

const SearchMatchPage = () => {
    return (
        <>
            <Menu />
            <Background />
            <FilterTableCRUD />
        </>
    )
};

export default SearchMatchPage;
