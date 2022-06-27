import React from 'react';
import './RatingComp.css';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const  RatingComp=(props)=> {
    const [currentRating, setCurrentRating] = React.useState();

    React.useEffect(() => {
        setCurrentRating(Math.floor(props.rating / 2));
    }, [props.rating])

    return (
        <div className="rating" data-rating={currentRating}>
            {[...Array(+props.numberOfStars).keys()].map((n, index) => {
                let starColor = "black";
                if ((index + 1) <= currentRating) {
                    starColor = "yellow";
                }
                return (
                    <StarBorderIcon color="inherit" className="star" style={{ color: starColor }}
                        onClick={() => setCurrentRating(index + 1)}
                        key={index}
                    />
                );
            })}
        </div>
    );
}

export default RatingComp;