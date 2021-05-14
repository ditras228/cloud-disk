import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../actions/file";
import File from "./fileList/file/File";
import FileList from "./fileList/FileList";
import {Button, Container} from "react-bootstrap";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir= useSelector(state => state.file.currentDir)

    useEffect(()=>{
       console.log(dispatch(getFiles(currentDir)))

    }, [currentDir])
    return (
        <>
            <Container style={{marginBottom: 20}}>
                <Button style={{marginRight: 10}}>Назад</Button>
                <Button>Создать папку</Button>
            </Container>

            <FileList/>
            <File/>
        </>
    );
};

export default Disk;