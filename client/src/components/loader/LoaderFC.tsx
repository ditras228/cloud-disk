import React from 'react';
import {Spinner} from "react-bootstrap";
import classes from './Loader.module.css'

const LoaderFC = () => {
    return (
        <Spinner animation="grow" className={classes.spinner}/>
    );
};

export default LoaderFC;