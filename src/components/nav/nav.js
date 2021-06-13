import "./nav.scss"
import {Button, TextField} from "@material-ui/core";
import { useState} from "react";
import ModalSearch from "./modalSearch";

const Nav = () => {
    const [search, setSearch] = useState([]);
    const [pokemon, setPokemon] = useState("");
    const [open, setOpen] = useState(false);
    const [errorInput,setErrorInput] = useState(false)
    const [inputLabel,setInputLabel] = useState(false)

    const findPokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(data=>data.json())
            .then(
                (data)=> {
                          if (pokemon.length===0 || data.status==="404"){
                              setErrorInput(true)
                              setInputLabel(true)
                          }else {
                              setSearch(data)
                              setOpen(true);
                              setErrorInput(false)
                              setInputLabel(false)
                          }
                }

            )
            .catch(()=>{
                setInputLabel(true)
                setErrorInput(true)
            })
    }

    return (
        <div className="navBar">
            <div className="navBar__title">
                <h2>
                    <a href="">Pokemon</a>
                </h2>
            </div>
            <div className="navBar__search">
                <TextField
                    error={errorInput}
                    id="standard-basic"
                    label={inputLabel?"Please write correct":"Write pokemon"}
                    value={pokemon} onChange={(e)=>{
                    setPokemon(e.target.value.toLowerCase())

                }}/>
                <Button
                    variant="outlined"
                    onClick={findPokemon}>
                    Search
                </Button>
                 <ModalSearch
                     open={open}
                     setOpen={setOpen}
                     search={search}
                 />
            </div>
        </div>
    )
}

export default Nav;
