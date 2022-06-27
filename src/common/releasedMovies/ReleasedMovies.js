import React from "react";
import "./ReleasedMovies.css";
import { useState, useEffect } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { InputLabel, Input, TextField } from '@material-ui/core';
import { FormControl } from '@material-ui/core';



const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'wrap',
        transform: 'translateZ(0)',

    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    tile: {
        cursor: 'pointer'
    }
});







const ReleasedMovie = (props) => {
    const { classes } = props;
    const [data, setData] = useState([]);
    const [genresName, setGenresName] = React.useState([]);
    const [genresNames, setGenresNames] = React.useState('');
    const [movieName, setMovieName] = React.useState('');
    const [artist, setArtist] = React.useState([]);
    const [artistCopy, setArtistCopy] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [genre,setGenre]= useState([]);
    const [fArtist,setFArtist] = useState([])

    const [valueOfGenre,setValueOfGenre] = useState('');
    const [valueOfArtist,setValueOfArtist] = useState('');


    useEffect(() => {

        fetch(props.baseUrl + 'movies')
            .then(res => res.json())
            .then(result => {
                setData(result.movies)
            })
            .catch(err => console.log(err))

            fetch(props.baseUrl + 'genres')
            .then(res => res.json())
            .then(result => {
                let r = result.genres.map((el,i)=>{
                    return  {...el,'value':el['description']}
                })
                setGenre(r);
                })
                .catch(err => console.log(err))

                fetch(props.baseUrl +'artists')
                .then(res => res.json())
                .then(result => {
                    let r = result.artists.map((el,i)=>{
                        return {...el , 'value':el['first_name'] + ' ' + el['last_name']}
                    })

                    setFArtist(r);
                })
                .catch(err => console.log(err))
    }, [])


    const handleChange = (e) => {
        if (e.target.name === 'genres') {
            const {
                target: { value }
            } = e;
            let res = e.target.value.map((obj) => {
                let n = genre.filter((el,i)=>{
                    return el.id === obj
                }).map((el,i)=> el['value'])
                n.map((el)=> el['value'])}).join(",")
            setGenresName(typeof value === "string" ? value.split(",") : value);
            setGenresNames(res);


        } else if (e.target.name === 'movieName') {
            setMovieName(e.target.value);


        } else if (e.target.name === 'artist') {
            const {
                target: { value }
            } = e;

           let res = e.target.value.map((obj) => {
                let n = fArtist.filter((el,i)=>{
                    return el.id === obj
                }).map((el,i)=> el['value'])
                n.map((el)=> el['value'])}).join(",")
            setArtist(typeof value === "string" ? value.split(",") : value);
            setArtistCopy(res);


        } else if (e.target.name === 'startDate') {
            setStartDate(e.target.value);
        } else {
            setEndDate(e.target.value);
        }

    }

    const filterMovie = ()=>{

         let queryString = "movies?";
    queryString += "title=" + movieName;
    if (genresName.length > 0) {
      queryString += "&genres=" + valueOfGenre;
    }
    if (artist.length > 0) {
      queryString += "&artists=" + valueOfArtist;
    }
    if (startDate !== "") {
      queryString += "&start_date=" + startDate;
    }
    if (endDate !== "") {
      queryString += "&end_date=" + endDate;
    }

        fetch(props.baseUrl + queryString)
        .then(res => res.json())
        .then(result => {
            setData(result.movies);
        })
        .catch(err => console.log(err))
    }

    const setValue = (e)=>{
        if(e.target.name === 'genres'){
            let res = [];
            for(let i=0;i<genre.length;i++){
                for(let j=0;j<genresName.length;j++){
                    if(genre[i]['id'] === genresName[j]){
                        res.push(genre[i]['value'])
                    }
                }
            }
            setValueOfGenre(res.toString());

        }else{
            let res = [];
            for(let i=0;i<fArtist.length;i++){
                for(let j=0;j<artist.length;j++){
                    if(fArtist[i]['id'] === artist[j]){
                        res.push(fArtist[i]['value'])
                    }
                }
            }
            setValueOfArtist(res.toString());
        }
    }






    return (
        <div className="releasedMovieContainer">
            <div className="movieContainer">
                <div className={classes.root}>
                    <GridList className={classes.gridList} cols={ data.length > 3 ? 4 : data.length === 1 ? 1 : data.length === 2 ? 2 : 3 } cellHeight={350} >
                        {data.map(tile => (
                            
                            <GridListTile key={tile.id} className={classes.tile} onClick={event =>  window.location.href=`/movie/${tile.id}`}>
                                <img src={tile.poster_url} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    actionIcon={
                                        <IconButton>
                                            <StarBorderIcon className={classes.title} />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                            
                        ))}
                    </GridList>
                </div>

            </div>
            <div className="filterContainer">

                {/* // <SimpleCard/> */}

                <Card variant="outlined" className="card">
                    <CardContent>

                        <div className="cardHeader">FIND MOVIES BY:</div>
                        <div className='inputContainers'>
                            <FormControl variant="standard" className="formControl">
                                <InputLabel htmlFor="component-simple">Movie Name</InputLabel>
                                <Input id="component-simple" name='movieName' fullWidth={true} value={movieName} onChange={handleChange} />
                            </FormControl>
                            <FormControl variant="standard" className="formControl">
                                <InputLabel htmlFor="component-simple">Genres</InputLabel>
                                <Select
                                    multiple
                                    value={genresName}
                                    name="genres"
                                    onChange={handleChange}
                                    onBlur={setValue}

                                    renderValue={(selected) =>{
                                        return selected.map((obj) => {
                                           return  genre.filter((el,i)=>{
                                                 return el.id === obj
                                            }).map((el,i)=> el['value'])
                                        }).join(',')}
                                    }
                                >
                                    {genre.map((name) => (
                                        <MenuItem key={name.id} value={name.id}>
                                            <Checkbox checked={genresName.indexOf(name.id) > -1} />
                                            <ListItemText primary={name.value} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" className="formControl">
                                <InputLabel htmlFor="component-simple">Artist</InputLabel>
                                <Select
                                    multiple
                                    value={artist}
                                    name="artist"
                                    onChange={handleChange}
                                    onBlur={setValue}

                                    renderValue={(selected) =>{
                                        return selected.map((obj) => {
                                           return  fArtist.filter((el,i)=>{
                                                 return el.id === obj
                                            }).map((el,i)=> el['value'])
                                        }).join(',')}
                                    }
                                >
                                    {fArtist.map((name) => (
                                        <MenuItem key={name.id} value={name.id}>
                                            <Checkbox checked={artist.indexOf(name.id) > -1} />
                                            <ListItemText primary={name.value} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" className="formControl">

                                <TextField id="component-simple" type="date" onChange={handleChange} value={startDate} name="startDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Release date start"
                                />
                            </FormControl>
                            <FormControl variant="standard" className="formControl">

                                <TextField id="component-simple" type="date" onChange={handleChange} value={endDate} name="endDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Release date end"
                                />
                            </FormControl>
                            <div className='buttonContainer'>
                                <Button variant="contained" color='primary' fullWidth={true} onClick={filterMovie}>APPLY</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )

}

export default withStyles(styles)(ReleasedMovie);