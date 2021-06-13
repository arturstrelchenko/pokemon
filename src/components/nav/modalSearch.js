import React, {useState} from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "./nav.scss";
import "../card/card.scss"
import '../../components/card/card.scss';
import colorsPokemons from "../colorPokemon";


const ModalSearch = ({open,setOpen,search}) =>{
    return (

        <div className="modal">

            <Modal open={open} onClose={()=>{setOpen(false)}} center>
                <div className="wrapModal"  >
                        {
                            search.length === 0 ? (console.log(search)) : (
                                <>
                                    <div className="wrapImage">
                                    <img
                                        src={search?.sprites?.front_default===null?"https://ibo2020.org/wp/wp-content/themes/luxeritas/images/no-img.png":search?.sprites?.front_default}
                                         alt=""
                                         className="imgModal"
                                    />
                                    <img
                                        src={search?.sprites?.back_default===null?"https://ibo2020.org/wp/wp-content/themes/luxeritas/images/no-img.png":search?.sprites?.back_default}
                                         alt=""
                                         className="imgModal"
                                    />
                                    </div>
                                        <p style={{fontSize: "23px"}}>
                                            <b>{search.name}</b>
                                        </p>
                                    {search && search.stats.map((stat, key) => {
                                        return <p key={key}>
                                            <b>
                                                {stat.stat.name}
                                            </b> : {stat.base_stat}
                                        </p>
                                    })}
                                    {search.types.map(((type, key) => {
                                        return (
                                            <div className="search__type"
                                                 style={{backgroundColor: colorsPokemons[type.type.name]}}
                                                 key={key}
                                            >
                                                {type.type.name}
                                            </div>
                                        )
                                    }))}
                                </>
                            )
                        }

                </div>
            </Modal>
        </div>
    );
};

export default ModalSearch;