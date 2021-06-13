import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './card.scss'
import colorPokemon from "../colorPokemon";
import ModalSearch from "../nav/modalSearch";
import {Button} from "@material-ui/core";
const useStyles = makeStyles({
    table: {
        width:"100%"
    },
});


export default function DenseTable({searchTyp,setShowTablePokemon,showTablePokemon}) {
    const classes = useStyles();
    const [tablePokemon,setTablePokemon] = useState('');
    const [storeTable,setStoreTable] = useState([]);
    const [open,setOpen] = useState(false)



    useEffect(()=>{
       tableClick()
    },[tablePokemon])

    const tableClick = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${tablePokemon}`)
            .then(data=>data.json())
            .then(
                (data)=> {
                    if(tablePokemon.length===0 || data.status==="404"){
                      return
                    }else{
                        setStoreTable(data)
                        setOpen(true);
                    }
                }

            )
            .catch(()=>alert("Try again please"))
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}
                   size="small"
                   aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            align={"center"}
                            style={{color:colorPokemon[searchTyp.name]}}>

                            {searchTyp?.name===undefined?<><b>Chose please type of pokemon</b></>:<> All pokemon <b>{searchTyp.name}</b></>}

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {searchTyp?.pokemon?.map((row,index=1) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell
                                align="left"
                                style={{color:'blue',cursor:"pointer"}}
                                onClick={() =>{
                                    setTablePokemon(row.pokemon.name)
                                      if(tablePokemon===tablePokemon){
                                         return
                                      }else {
                                          tableClick()
                                      }
                                }}
                            >
                                {row.pokemon.name}</TableCell>

                        </TableRow>
                    ))}

                    <ModalSearch
                        open={open}
                        setOpen={setOpen}
                        search={storeTable}
                    />

                </TableBody>
            </Table>
            <Button variant={"outlined"}
                    onClick={() => setShowTablePokemon(!showTablePokemon)}>
                {showTablePokemon ? 'Close' : 'Open'}table pokemon
            </Button>
        </TableContainer>
    );
}
