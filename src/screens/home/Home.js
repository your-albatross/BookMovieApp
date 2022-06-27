import React from 'react';
import Header from '../../common/header/Header';
import UpcomingMovie from '../../common/upcomingMovie/UpcomingMovie';
import ReleasedMovie from '../../common/releasedMovies/ReleasedMovies';
import './Home.css';

const  Home = (props)=>{


    return (
        <div>
                <Header baseUrl={props.baseUrl}/>
                <UpcomingMovie baseUrl={props.baseUrl}/>
                <ReleasedMovie baseUrl={props.baseUrl}/>
            </div>

    )
}

export default Home;