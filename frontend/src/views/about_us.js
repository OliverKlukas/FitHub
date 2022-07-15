import * as React from "react";
import { Avatar, Grid, Stack, Typography, Paper } from "@mui/material";
import Johannes from "./../resources/Johannes.jpg";
import Maximilian from "./../resources/Maximilian.jpeg";
import Oliver from "./../resources/Oliver.jpg";
import Simon_Vogl from "./../resources/Simon_Vogl.jpg";
import AboutUs_Header from "./../resources/AboutUs_Header.jpg";
import AboutUs_Picture_1 from "./../resources/AboutUs_Picture_1.jpg";
import AboutUs_Picture_2 from "./../resources/AboutUs_Picture_2.png";
import AboutUs_Team from "./../resources/AboutUs_Team.jpg";

// images of our team members
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

/**
 * About us page, that describes our mission, business idea and team.
 *
 * @return {JSX.Element}
 */
export default function AboutUs() {
  return (
    <Stack padding={4} sx={{ bgcolor: "#EEEEEE", borderRadius: 3 }}>
      <Paper
        sx={{
          backgroundImage: `url(${AboutUs_Header})`,
          backgroundSize: "cover",
          borderRadius: 3,
        }}
      >
        <Stack
          justifyContent="center"
          width="100%"
          height="100%"
          padding={16}
          paddingTop={24}
          spacing={2}
          sx={{
            borderRadius: 3,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
          }}
        >
          <Typography
            align="center"
            fontSize="60px"
            fontWeight="700"
            color="white"
          >
            About us
          </Typography>
          <Typography variant="h3" align="center" color="white">
            Let's get fit, together!
          </Typography>
        </Stack>
      </Paper>

      <Grid
        container
        direction="row"
        alignItems="stretch"
        spacing={8}
        padding={8}
      >
        <Grid item xs={6} xl={3}>
          <Paper
            elevation={12}
            sx={{
              bgcolor: "#EEEEEE",
              backgroundSize: "cover",
              borderRadius: 3,
              p: 2,
              height: 1,
            }}
          >
            <Typography variant="h1" align="center" padding={2} margin={4}>
              Our Mission
            </Typography>
            <Typography variant="h4" align="center" margin={4}>
              We want to help Fitness Content Creators to reach a large audience
              of health-conscious consumers and fitness enthusiasts, while also
              providing a trustworthy and simple-to-use platform where everybody
              can easily find training plans, fitness plans or coachings suited
              for their fitness level, their preferences and their dietary
              requirements.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} xl={3}>
          <Paper
            elevation={12}
            height="100%"
            sx={{
              bgcolor: "#EEEEEE",
              backgroundSize: "cover",
              borderRadius: 3,
              p: 2,
              height: 1,
            }}
          >
            <Typography variant="h1" align="center" padding={2} margin={4}>
              Business Idea
            </Typography>
            <Typography variant="h4" align="center" margin={4}>
              FitHub is the platform where fitness content creators sell their
              training and nutrition plans to fitness enthusiasts and
              health-conscious consumers.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} xl={6}>
          <Paper
            elevation={12}
            height="100%"
            sx={{
              backgroundImage: `url(${AboutUs_Picture_1})`,
              borderRadius: 3,
              backgroundSize: "cover",
              p: 2,
              height: 1,
              minHeight: 400,
            }}
          ></Paper>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="stretch"
        spacing={8}
        padding={8}
      >
        <Grid item xs={12} xl={6}>
          <Paper
            elevation={12}
            height="100%"
            sx={{
              backgroundImage: `url(${AboutUs_Picture_2})`,
              borderRadius: 3,
              backgroundSize: "cover",
              p: 2,
              height: 1,
              minHeight: 400,
            }}
          />
        </Grid>
        <Grid item xs={6} xl={3}>
          <Paper
            elevation={12}
            height="100%"
            sx={{
              bgcolor: "#EEEEEE",
              backgroundSize: "cover",
              borderRadius: 3,
              p: 2,
              height: 1,
            }}
          >
            <Typography variant="h1" align="center" padding={2} margin={4}>
              Who are we?
            </Typography>
            <Typography variant="h4" align="center" margin={4}>
              We are a team of four Information Systems Master Students from the
              Technical University of Munich. This Application was created as
              part of the SEBA Master Web Application Engineering Course.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} xl={3}>
          <Paper
            elevation={12}
            height="100%"
            sx={{
              bgcolor: "#EEEEEE",
              backgroundSize: "cover",
              borderRadius: 3,
              p: 2,
              height: 1,
            }}
          >
            <Typography variant="h1" align="center" padding={2} margin={4}>
              What makes FitHub unique?
            </Typography>
            <Typography variant="h4" align="center" margin={4}>
              We provide Fitness Content Creators and health-conscious consumers
              with a Platform, where they can directly sell/buy fitness content.
              By providing a trustworthy payment process (by using Paypal for
              transaction management), a transparent review system and intuitive
              easy-to-use filtering FitHub creates value for both content
              creators and health-conscious consumers.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper
        elevation={12}
        height="100%"
        sx={{
          backgroundImage: `url(${AboutUs_Team})`,
          backgroundSize: "cover",
          borderRadius: 3,
          p: 2,
          height: 1,
        }}
      >
        <Typography
          variant="h1"
          align="center"
          fontSize="45px"
          color="#EEEEEE"
          paddingTop={8}
          paddingBottom={5}
        >
          Meet our team
        </Typography>
        <Stack
          direction="row"
          spacing={6}
          justifyContent="space-around"
          padding={2}
        >
          {members.map((item) => (
            <Stack alignItems="center" key={item.name} spacing={2}>
              <Avatar
                sx={{
                  width: "12vw",
                  height: "12vw",
                  boxShadow: 5,
                }}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
              />
              <Typography variant="h3" color="#EEEEEE">
                {item.name}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
      <Typography variant="h1" align="center" padding={2} paddingTop={8}>
        Disclaimer
      </Typography>
      <Typography variant="h4" align="center">
        This is not an actual Platform but rather just a fully functional proof
        of concept. All code is the shared intellectual property of the four
        aforementioned Team members. The Application is not licensed and any
        transactions done using the PayPal Payment System will be sent to a
        developer account and refunded. The Content and Content Creators are
        mocked.
      </Typography>
    </Stack>
  );
}
