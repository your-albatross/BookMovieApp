import React from "react";
import { useState, useEffect } from "react";
import "./UpcomingMovie.css"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

const UpcomingMovie = (props) => {

    

    const { classes } = props;

    const [data, setData] = useState([]);

    useEffect(() => {

        fetch(props.baseUrl + '/movies')
            .then(res => res.json())
            .then(result => {
                setData(result.movies)
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div className="container">
            <div className="upComingHeader">Upcoming Movie</div>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={6} cellHeight={250}>
                    {data.map(tile => (
                        <GridListTile key={tile.id}>
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

    )
}
export default withStyles(styles)(UpcomingMovie);

//export default UpcomingMovie;