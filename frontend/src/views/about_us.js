import * as React from "react";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Johannes from "./../resources/Johannes.jpg";
import Maximilian from "./../resources/Maximilian.jpeg";
import Oliver from "./../resources/Oliver.jpg";
import Simon_Vogl from "./../resources/Simon_Vogl.jpg";

const members = [
    {
        img: Maximilian,
        name: "Maximilian Schumergruber",
    },
    {
        img: Simon_Vogl,
        name: "Simon Vogl",
    },
    {
        img: Oliver,
        name: "Oliver Klukas",
    },
    {
        img: Johannes,
        name: "Johannes Loebbecke",
    },
];

function AboutUs() {
    return (
        <Stack direction="column" spacing={4} alignItems="center" justifyContent="center" marginLeft="20%" marginRight="20%">
            <Typography variant="h1" align="center">
                Our Mission
            </Typography>
            <Typography variant="h4" align="center">
                We want to help Fitness Content Creators reaching a larger audience than on Social Media, while also providing a trustworty and simple-to-use
                solution for fitness enthusiasts to find training plans, fitness plans or coachings suited for their preferences.
            </Typography>
            <Typography variant="h1" align="center">
                Business Idea
            </Typography>
            <Typography variant="h4" align="center">
                FitHub is the platform where fitness content creators sell their training and nutrition plans to fitness enthusiasts and health-conscious consumers.
            </Typography>
            <Typography variant="h1" align="center">
                Who are we?
            </Typography>
            <Typography variant="h4" align="center">
                We are a team of four Information Systems Students from the Technical University of Munich. This Application was created as part of the SEBA Master Web Application
                Engineering Course.
            </Typography>
            <Stack direction="row" spacing={2}>
                {members.map((item) => (
                    <Stack alignItems="center" spacing={2}>
                        <Avatar
                            sx={{
                                width: "12vw",
                                height: "12vw",
                                boxShadow: 5,
                            }}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                        />
                        <Typography variant="h4">{item.name}</Typography>
                    </Stack>
                ))}
            </Stack>
            <Typography variant="h1" align="center">
                What do we do?
            </Typography>
            <Typography variant="h4" align="center">
                We provide Fitness Content Creators and Fitness interested Customers with a Platform, where they can directly sell/buy content. By providing a trustworthy payment
                scheme, transparent review system and intuitive filtering both content creators and customers are encouraged to use our Platform
            </Typography>
            <Typography variant="h1" align="center">
                Disclaimer
            </Typography>
            <Typography variant="h4" align="center">
                This is not an actual Platform but rather just a fully functional proof of concept. All code is the shared intellectual property of the four aforementioned Team
                members. The Application is not licensed and any transactions done using the PayPal Payment System will be sent to a developer account and refunded. The Content and
                Content Creators are mocked.
            </Typography>
        </Stack>
    );
}

export default AboutUs;
