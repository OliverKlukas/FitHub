import ContentCreatorProfile from '../components/profilecomponents/content_creator_profile';
import React from 'react';
import { loremIpsum, Avatar } from 'react-lorem-ipsum';
import { Stack } from "@mui/material";
import ContentCreatorOwnProfile from '../components/profilecomponents/content_creator_own_profile';


const content = [{
    author: "Terry Pratched",
    text: loremIpsum(),
    title: "Creates great training plans",
    date: "18.03.2021",
    star: 5,
}, {
    author: "Brandon Sanderson",
    text: loremIpsum(),
    title: "Does not have the best Workout Systems",
    date: "13.01.2022",
    star: 3,
}, {
    author: "Karen Kardashian",
    text: loremIpsum(),
    title: "If I could give 0 stars I would",
    date: "10.05.2021",
    star: 1,
}

]

{/** 
        <Stack>
    {ContentCreatorOwnProfile("Igor Something", "This is where a real trainer would have their description, this is intentionally a rather long text, to check for formatting with longer texts", content) 
     }
    </Stack> //Add functionality that it swaps between the two views depending on the user

            {ownProfileBoolean &&
                ContentCreatorOwnProfile("Igor Something", "This is where a real trainer would have their description, this is intentionally a rather long text, to check for formatting with longer texts", content)
                || ContentCreatorProfile("Igor Something", "This is where a real trainer would have their description, this is intentionally a rather long text, to check for formatting with longer texts", content)
            }
    
    */}
function ProfileViews(ownProfileBoolean) {

    const [ownProfile, setOwnProfile] = React.useState(ownProfileBoolean)


    return (

        <Stack>


            {ownProfileBoolean
                ? <ContentCreatorOwnProfile name="Igor Something" description="This is where a real trainer would have their description" reviews={content} />
                : <ContentCreatorProfile name="Igor Something" description="This is where a real trainer would have their description" reviews={content} />
            }

            {console.log(ownProfileBoolean)}


        </Stack>

    )
}

export default ProfileViews;