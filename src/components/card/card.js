import {useEffect, useState} from "react";
import {getAllPokemon, getPokemon} from "../getPokemons";
import './card.scss'
import {Button, CircularProgress} from "@material-ui/core";
import MediaCard from "./cardItem";
import ControlledOpenSelect from "./selectPage";
import colorPokemon from "../colorPokemon";
import typePokemon from "../typePokemon";
import DenseTable from "./tableCard";


const Card = () => {
    const [store, setStore] = useState([]);
    const [searchType, setSearchType] = useState([]);
    const [type, setType] = useState('');
    const [showTablePokemon, setShowTablePokemon] = useState(false)
    const [nextPokemon, setNextPokemon] = useState('')
    const [prevPokemon, setPrevPokemon] = useState('')
    const [load, setLoad] = useState(true)
    const [page, setPage] = useState(10);
    const defaultValue = `https://pokeapi.co/api/v2/pokemon?limit=${page}&offset=1000`;

    useEffect(() => {
        async function getData() {
            let response = await getPokemon(defaultValue)
            setNextPokemon(response.next)
            setPrevPokemon(response.previous)
            let pokemon = await allPokemon(response.results)
            setLoad(false)
        }

        getData()
    }, [page])

    const allPokemon = async (data) => {
        let pokemon = await Promise.all(data.map(async pokemon => {
            let pokeWrite = await getAllPokemon(pokemon.url);
            return pokeWrite
        }))
        setStore(pokemon)
    }

    const btnNext = async () => {
        setLoad(true);
        let data = await getAllPokemon(nextPokemon);
        await allPokemon(data.results);
        setNextPokemon(data.next)
        setPrevPokemon(data.previous)
        setLoad(false);
    }
    const btnPrev = async () => {
        if (!prevPokemon) return
        setLoad(true)
        let data = await getAllPokemon(prevPokemon);
        await allPokemon(data.results);
        setNextPokemon(data.next)
        setPrevPokemon(data.previous)
        setLoad(false);
    }

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type/${type}`)
            .then((data) => data.json())
            .then(data => setSearchType(data))
    }, [type])


    return (
        <>
            <div style={{marginTop:"30px"}}>
            <Button variant={"outlined"  }
                    onClick={() => setShowTablePokemon(!showTablePokemon)}>{showTablePokemon ? 'Close' : 'Open'}
                table pokemon
            </Button>
            </div>
            {showTablePokemon ? (
                <>
                <div className="wrapTypeItem">
                    {
                        typePokemon.map((item, key) => {
                            return (
                                <div style={{cursor: "pointer"}} key={key}>
                                    <p key={key} style={{color: colorPokemon[item]}} onClick={() => setType(item)}>
                                        {item}
                                    </p>
                                </div>
                            )
                        })
                    }

                </div>
                <DenseTable
                    searchTyp={searchType}
                    showTablePokemon={showTablePokemon}
                    setShowTablePokemon={setShowTablePokemon}
                />
            </>
            ) : (

            <>

            <div className="btnWrap">
                <Button variant="outlined"
                        onClick={btnPrev}>
                    Prev
                </Button>
                <Button variant="outlined"
                        onClick={btnNext}
                >
                    Next</Button>

            </div>
            <ControlledOpenSelect
                setPage={setPage}
                setLoad={setLoad}/>
            <div>

            </div>
            <div className="wrapCard">

                {load ? (<CircularProgress/>) : (
                    store.map((pok, i) => {
                        return (

                            <MediaCard pok={pok} key={i}/>

                        )
                    })
                )}
            </div>
            <div className="btnWrap">
                <Button variant="outlined"
                        onClick={btnPrev}>
                    Prev
                </Button>
                <Button variant="outlined"
                        onClick={btnNext}>
                    Next
                </Button>

            </div>
            </>
                )}

        </>
    )

}
export default Card;