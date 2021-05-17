import React from 'react';
import {Button, ButtonGroup, Card, Col, Container, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {deleteFile, downloadFile} from "../../../../redux/actions/file";
import {CloudDownloadFill, FileEarmark , Folder, TrashFill} from 'react-bootstrap-icons';
import {IFile} from '../../../../types/types'
import {CurrentDir} from '../../../../redux/selectors'
import {fileReducerAction} from '../../../../redux/reducers/fileReducer'
import classes from '../FileList.module.css'

const FileFC: React.FC<FileProps> = ({file,view}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => CurrentDir(state))

    function openDirHandler() {
        if (file.type === 'dir') {
            dispatch(fileReducerAction.pushToStack(currentDir))
            dispatch(fileReducerAction.setCurrentDir(file.id))
        }
    }

    function deleteClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    function downloadClickHandler(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        e.stopPropagation()
        downloadFile(file)
    }
    function getName(name: string){
        let newName: Array<string>
        if(file.type!=='dir') {
            newName = name.split(".");
            return newName[0].slice(1, 9) + '... .' + newName[1]
        }
        else
            return name
    }
    if(view=='grid') {
        return (
            <Card className={classes.item}>
                <Card.Header>
                    {
                        getName(file.name)
                    }
                </Card.Header>
                <Card.Body style={{textAlign: 'center', fontSize: 50}}>
                    {
                        file.type == 'dir' ? <Folder/> : <FileEarmark/>
                    }
                </Card.Body>
            </Card>
        )
    }
    return (
        <Container onClick={() => openDirHandler()} style={{marginBottom: 10}}>
            <Row>
                <Col sm={1} style={{fontSize: 30}}>
                    {
                        file.type=='dir'? <Folder/> : <FileEarmark/>
                    }
                </Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={5}>{file.name}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={2}>{file.data.slice(0, 10)}</Col>
                <Col style={{display: 'flex', alignItems: 'center'}} sm={2}> {file.size}</Col>
                { file.type === 'dir'
                    ? <></>
                    :
                    <Col sm={2}>
                        <ButtonGroup>
                            <Button onClick={e => deleteClickHandler(e)}>
                                <TrashFill/>
                            </Button>
                            <Button onClick={e => downloadClickHandler(e)}>
                                <CloudDownloadFill/>
                            </Button>
                        </ButtonGroup>
                    </Col>}
            </Row>
        </Container>
    );
};

export default FileFC;

type FileProps = {
    file: IFile,
    view: string
}