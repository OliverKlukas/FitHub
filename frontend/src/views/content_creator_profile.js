import { Divider } from '@mui/material';
import * as React from 'react';

import BasicStack from '../components/reviewlist/stack';
import UpperProfile from '../components/UpperProfile/UpperProfile';

function ContentCreatorProfile(){
    return(
        UpperProfile(),
        <Divider/>,
        BasicStack()

    ) 
}


export default ContentCreatorProfile;