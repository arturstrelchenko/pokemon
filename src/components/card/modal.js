import React, {useState} from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {Button} from "@material-ui/core";
import './card.scss';

const ModalWindow = ({img,pok,imgBack}) =>{
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div className="modal">
            <Button
                variant="outlined"
                color="primary"
                onClick={onOpenModal}>

                Open more information

            </Button>

            <Modal
                open={open}
                onClose={onCloseModal}
                center>
                <div>

                    <div className="wrapImage">
                    <img
                        src={img===null?"https://ibo2020.org/wp/wp-content/themes/luxeritas/images/no-img.png":img}
                        alt=""
                        className="imgModal"/>
                    <img
                        src={imgBack===null?"https://ibo2020.org/wp/wp-content/themes/luxeritas/images/no-img.png":imgBack}
                        alt=""
                        className="imgModal"/>
                    </div>
                        {pok && pok.stats.map((stat,key)=>{
                        return <p key={key}>
                            <b>{stat.stat.name}</b> : {stat.base_stat}
                        </p>
                    })}
                </div>
            </Modal>
        </div>
    );
};

export default ModalWindow;