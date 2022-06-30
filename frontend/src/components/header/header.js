import * as React from "react";
import { Link, Stack } from "@mui/material";
import { ReactComponent as AvatarFemale } from "../../resources/avatar_female.svg";
import { ReactComponent as AvatarMale } from "../../resources/avatar_male.svg";
import { ReactComponent as Logo } from "../../resources/logo_standard.svg";
import { ReactComponent as LogoSmall } from "../../resources/logo_small.svg";
import { ReactComponent as LogoText } from "../../resources/logo_text.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { LinkButton } from "../buttons/link_button";

/**
 *  Header bar component that is visible on all views.
 *
 * @param gender - Specifies the gender="male" | "female" which dictates the profile SVG's appearance.
 * @param userType - Specifies the userType="content-creator" | "user" which dictates user specific customizations.
 * @return {JSX.Element}
 */
export function Header({ gender, userType, signedIn }) {
  // Sub-urls and link names for available page views.
  let pages;
  let icondirection;
  if (userType === "content-creator") {
    pages = {
      discovery: "Discovery",
      upload: "Offer Content",
      about: "About us",
    };
    icondirection = "/landing";
  } else {
    pages = {
      discovery: "Discovery",
      plans: "My Plans",
      about: "About us",
    };
    icondirection = "/discovery";
  }

  // Anchor hook to open/close the navigation menu when option selected or clicked off.
  const [anchorElSet, setAnchorElSet] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // Sub-urls and link names for available user menu options.
  const settings = {
    profile: "Profile",
    contact: "Contact",
    logout: "Logout",
  };

  // Anchor hook to open/close the user settings menu when option selected or clicked off.
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenSetMenu = (event) => {
    setAnchorElSet(event.currentTarget);
    console.log(signedIn);
  };
  const handleCloseSetMenu = () => {
    setAnchorElSet(null);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      my={2}
    >
      <Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Link href={icondirection}>
            <Logo />
          </Link>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {Object.keys(pages).map((url) => (
              <MenuItem key={url} onClick={handleCloseNavMenu}>
                <Link href={url} underline="none" color="inherit">
                  {pages[url]}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Link href={"/discovery"}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LogoSmall />
              <LogoText />
            </Stack>
          </Link>
        </Box>
        <Stack
          direction="row"
          spacing={4}
          pr={16}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {Object.keys(pages).map((url) => (
            <LinkButton
              key={url}
              variant="text"
              component={RouterLink}
              to={url}
            >
              {pages[url]}
            </LinkButton>
          ))}
        </Stack>
      </Box>
      <Box>
        <IconButton onClick={handleOpenSetMenu}>
          {gender === "male" ? <AvatarMale /> : <AvatarFemale />}
        </IconButton>
        <Menu
          sx={{ mt: "60px" }}
          id="menu-appbar"
          anchorEl={anchorElSet}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElSet)}
          onClose={handleCloseSetMenu}
        >
          {Object.keys(settings).map((url) => (
            <MenuItem key={url} onClick={handleCloseSetMenu}>
              <Link href={url} underline="none" color="inherit">
                {settings[url]}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Stack>
  );
}
