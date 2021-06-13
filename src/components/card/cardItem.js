import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './card.scss'
import colorsPokemons from "../colorPokemon";
import ModalWindow from "./modal";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin:5,

    },
    media: {
        height: 200,
        width: 250

    },
});

export default function MediaCard({pok}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}  >
            <CardActionArea>
                <CardMedia

                    className={classes.media}
                    image={pok.sprites.front_default===null?"https://ibo2020.org/wp/wp-content/themes/luxeritas/images/no-img.png":pok.sprites.front_default}
                    title="Contemplative Reptile"

                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className="wrapName">
                        {pok.name.charAt(0).toUpperCase() + pok.name.substr(1)}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="wrapTypes">
                        {pok.types.map(((type,key)=>{
                            return(
                                <div className="types__item"
                                style={{backgroundColor:colorsPokemons[type.type.name]}}
                                     key={key}
                                >
                                    {type.type.name}
                                </div>
                            )
                        }))}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p">

                        <b>Weight</b> : {pok.weight}
                        <br/>
                      <b>Height</b> : {pok.height}
                        <br/>
                  <b>Abilities</b> : {pok.abilities[0].ability.name}

                        <ModalWindow
                            img={pok.sprites.front_default}
                            imgBack={pok.sprites.back_default}
                            pok={pok} />
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
