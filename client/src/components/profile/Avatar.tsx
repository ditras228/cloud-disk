import React, {useRef, useState} from 'react'
import classes from './Profile.module.css'
import {Overlay, Popover} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {deleteAvatar} from '../../redux/actions/user'

const Avatar: React.FC<any> = ({avatar, fileUploadHandler}) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const dispatch = useDispatch()

    const handleClick = (event: any) => {
        setShow(!show);
        setTarget(event.target);
    };
    return (
            <div ref={ref} >
                    <div onClick={handleClick}  className={classes.container}>
                        <img className={classes.image} src={avatar} alt=""/>
                    </div>

                <input
                    id="avatar_input"
                    lang="ru"
                    multiple={true} type="file" accept={'image/*'} onChange={fileUploadHandler}
                    className={classes.input}
                />
                <Overlay
                    show={show}
                    target={target}
                    placement="bottom"
                    container={ref.current}
                    containerPadding={20}
                >
                    <Popover id="popover-contained">
                        <Popover.Content className={classes.popover}>
                            <label className={classes.button}
                                   htmlFor="avatar_input"
                            >Загрузить аватар</label>
                            <div className={classes.button}
                                 onClick={()=>dispatch(deleteAvatar())}>Удалить аватар</div>
                        </Popover.Content>
                    </Popover>
                </Overlay>
            </div>
    )
}

export default Avatar