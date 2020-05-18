import React, { Fragment, useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const interests = [
    {
        "_id": 1,
        "name": "News"
    },
    {
        "_id": 2,
        "name": "Sports"
    },
    {
        "_id": 3,
        "name": "Games"
    },
    {
        "_id": 4,
        "name": "Movies"
    },
    {
        "_id": 5,
        "name": "Music"
    }
]

function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if(currentIndex === -1) {
            //Push selected filter to array if it isn't already selected
            newChecked.push(value)
        } else {
            //Remove a selected filter from the array on second click if it was already selected
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }
    return (
        <div>
            {interests.map((value, index) => (
                <Fragment key={index}>
                <FormControlLabel
                    control={<Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} name="checkedH" />}
                    label={value.name}
                    onChange={() => handleToggle(value._id)}
                    type="checkbox"
                    checked={Checked.indexOf(value._id) === -1 ? false : true}
                    />
                </Fragment>
            ))}
        </div>
        
    )
}

export default CheckBox;