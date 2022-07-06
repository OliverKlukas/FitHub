import ImageList from '@mui/material/ImageList';
import React, { useEffect } from "react";
import HeaderCard from "../components/cards/header_image";
import SectionCard from "../components/cards/section_image";
import {Stack, useMediaQuery} from "@mui/material";
import theme from "../utils/theme";
import { useSelector } from "react-redux";

const content = [{
  option: "training",
  img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
  title: 'Training Plans'
},  {
  option: "nutrition",
  img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
  title: 'Nutrition Plan'
}, {
  option: "coaching",
  img: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74',
  title: 'Coaching'
}];

/**
 *
 * @param {props} props for user state management
 * @returns
 */
function LandingPage(props) {
  const user = useSelector((state) => state.user);

  const [header, setHeader] = React.useState({
    img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77",
    title: "Welcome to FitHub,",
    subtitle: "Lets get started, offer your content right away",
  });
  /**
   * Loads after the rendering has finished and fills the state with the name to replace the empty name
   */
  useEffect(() => {
    if (user.user) {
      const temp = {
        img: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77",
        title: "Welcome to FitHub, " + `${user.user.fname} ${user.user.lname}`,
        subtitle: "Lets get started, offer your content right away",
      };
      setHeader(temp);
    }
  }, [user]);

  const smallScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack sx={{ marginX: 6 }}>
      <ImageList
        sx={{
          // Promotes image list into its own layer in Chrome, costs memory, but helps keeping high FPS.
          transform: "translateZ(0)",
          overflow: "hidden",
        }}
        cols={smallScreenSize ? 1 : 1}
        gap={30}
      >
        <HeaderCard item={header} key={header.img} />
      </ImageList>
      <ImageList
        sx={{
          // Promotes image list into its own layer in Chrome, costs memory, but helps keeping high FPS.
          transform: "translateZ(0)",
          overflow: "hidden",
        }}
        cols={smallScreenSize ? 1 : 3}
        gap={30}
      >
        {content.map((item) => {
          return <SectionCard item={item} key={item.img} />;
        })}
      </ImageList>
    </Stack>
  );
}

export default LandingPage;
