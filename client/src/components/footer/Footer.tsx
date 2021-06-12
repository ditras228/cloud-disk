import React from 'react'
import {useSelector} from 'react-redux'
import {GetHand, GetThisFile} from '../../redux/selectors'
import FileFC from '../disk/fileList/file/File'
import classes from './Footer.module.css'

const Footer = () => {
    const hand = useSelector(state=> GetThisFile(state))
    if(!hand){
        return <></>
    }
    return (
        <div className={classes.footer}>
            <FileFC file={hand} view={'fooFile'} loader={false}/>
        </div>
    )
}

export default Footer