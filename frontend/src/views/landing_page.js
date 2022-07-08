import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import LandingImage from "../components/cards/image_landingpage";

const content = [
  {
    option: "training",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    title: "Training Plan",
  },
  {
    option: "nutrition",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
    title: "Nutrition Plan",
  },
  {
    option: "coaching",
    img: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
    title: "Coaching",
  },
];

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

  return (
    <Stack sx={{ marginX: 6 }} spacing={1}>
      <LandingImage ilink="/profile" iwidth={950} iheight={200} item={header} />
      <Stack direction="row" spacing={1}>
        <LandingImage
          ilink="/upload"
          iwidth={350}
          iheight={400}
          item={content[0]}
          isHeader={false}
        />
        <LandingImage
          ilink="/upload"
          iwidth={350}
          iheight={400}
          item={content[1]}
          isHeader={false}
        />
        <LandingImage
          ilink="/upload"
          iwidth={350}
          iheight={400}
          item={content[2]}
          isHeader={false}
        />
      </Stack>
    </Stack>
  );
}

export default LandingPage;
