import React from 'react';
import Header from '../../common/header/Header';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Details.css"
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import RatingComp from '../../common/RatingComp/RatingComp';

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
    },
    typo: {
        margin: '16px 0 16px 0'
    }

});





const Details = (props) => {
    const { classes } = props;

    const [data,setData] = useState({});
    const [poster,setPoster] = useState('')
    const [title,setTitle] = useState('')
    const [genres,setGenres] = useState([])
    const [duration,setDuration] = useState('')
    const [release_date,setReleaseDate] = useState('')
    const [critics_rating,setRating] = useState('')
    const [story_line,setStoryLine] = useState('')
    const [wiki_url,setWikiUrl] = useState('')
    const [videoCode,setVideoCode] = useState('')
    const [artists,setArtists] = useState([])
   

    const opts = {
        height: '300',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
      };



    useEffect(() => {
        let arr = window.location.href.split('/');
        fetch(props.baseUrl +`movies/${arr[arr.length - 1]}`)
            .then(res => res.json())
            .then(result => {
                setData(result);
                setPoster(result.poster_url);
                setTitle(result.title)
                setGenres(result.genres)
                setDuration(result.duration)
                setReleaseDate(result.release_date);
                setRating(result.rating)
                setStoryLine(result.storyline);
                setWikiUrl(result.wiki_url)
                let arr = result.trailer_url.split('=');
                setVideoCode(arr[arr.length-1])
                setArtists(result.artists);
            });
    }, [])


    const onReady = (e)=>{
        e.target.pauseVideo();

    }

    const rateClickHandler = (event) => {
        console.log(event.target);
    }

    




    return (
        <div>
            <Header baseUrl={props.baseUrl} />

            <p className='back'>
                <Link to={"/"} className="link">
                    &#60; Back to Home
                </Link>
            </p>
            <div className='detailsContainer'>
                <div className='posterCard'>
                    <div>
                        <img src={poster} alt='poster'></img>
                    </div>

                </div>
                <div className='mainContent'>
                    <div>
                        <Typography variant='headline' component='h2'>{title}</Typography>
                        <Typography style={{ fontWeight: 600 }}>
                            Genres: {genres.toString()}
                        </Typography>
                        <Typography style={{ fontWeight: 600 }}>
                            Duration: {duration}
                        </Typography>
                        <Typography style={{ fontWeight: 600 }}>
                            Release Date: {release_date}
                        </Typography>
                        <Typography style={{ fontWeight: 600 }}>
                            Rating: {critics_rating}
                        </Typography>
                        <Typography style={{ fontWeight: 600 }}>
                            Plot: <a href={wiki_url} target="_blank">(Wiki Link)</a> {story_line}
                        </Typography>
                        <br/>
                        <YouTube videoId={videoCode} opts={opts} onReady={onReady} />
                    </div>
                </div>
                <div className='ratingContent'>
                <Typography variant='subtitle1' component='h4'>Rate this movie:</Typography>
                <div className='ratingStar'>
                <RatingComp
                                numberOfStars="5"
                                rating={critics_rating}
                                onClick={rateClickHandler}
                            />
                    
                </div>
                <Typography variant='subtitle1' component='h4' className={classes.typo}>Artists</Typography>
                <GridList className={classes.gridList} cols={2} cellHeight={150}>
                        {artists.map(tile => (
                            
                            <GridListTile key={tile.id} className={classes.tile}>
                                <img src={tile.profile_url}  alt='poster'/>
                                <GridListTileBar
                                    title={tile.first_name + ' ' + tile.last_name}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                            
                        ))}
                    </GridList>

                </div>
            </div>
        </div>
    )

}

export default withStyles(styles)(Details);