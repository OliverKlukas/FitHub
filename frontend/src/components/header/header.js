/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable valid-jsdoc */
import * as React from "react";
import { Link, Stack } from "@mui/material";
// import { ReactComponent as AvatarFemale } from "../../resources/avatar_female.svg";
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
import MenuList from '@mui/material/MenuList';
import { LinkButton } from "../buttons/link_button";
// import { logout } from "../redux/actions";
import { useSelector, connect } from "react-redux";
import { logout } from "../../redux/actions";

/**
 *  Header bar component that is visible on all views.
 * 
 * @param {props} props - for user management
 * @param gender - Specifies the gender="male" | "female" which dictates the profile SVG's appearance.
 * @param userType - Specifies the userType="content-creator" | "user" which dictates user specific customizations.
 * @return {JSX.Element}
 */
function Header(props) {
  // Sub-urls and link names for available page views.
  const user = useSelector((state) => state.user);

  const pagesContentCreator = {
    discovery: "Discovery",
    upload: "Offer Content",
    about: "About us",
  };
  const icondirection = "/discovery";

  const pagesCustomer = {
    discovery: "Discovery",
    plans: "My Plans",
    about: "About us",
  };

  const pagesLoggedOut = {
    discovery: "Discovery",
    registration: "Registration",
    about: "About us"
  }
  console.log(user.user)

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
    contact: "Contact",
    signin: "Login",
    registration: "Registration"
  };

  // Anchor hook to open/close the user settings menu when option selected or clicked off.
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenSetMenu = (event) => {
    setAnchorElSet(event.currentTarget);
  };
  const handleCloseSetMenu = () => {
    setAnchorElSet(null);
  };
  const handlelogout = () => {
    props.dispatch(logout)
    location.reload();
    return false
  }

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
            {Object.keys(pagesCustomer).map((url) => (
              <MenuItem key={url} onClick={handleCloseNavMenu}>
                <Link href={url} underline="none" color="inherit">
                  {pagesCustomer[url]}
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
          {user.user
            ? [user.user.role === "customer"
              ? [
                Object.keys(pagesCustomer).map((url) => (
                  <LinkButton
                    key={url}
                    variant="text"
                    component={RouterLink}
                    to={url}
                  >
                    {pagesCustomer[url]}
                  </LinkButton>
                ))
              ]
              : [
                Object.keys(pagesContentCreator).map((url) => (
                  <LinkButton
                    key={url}
                    variant="text"
                    component={RouterLink}
                    to={url}
                  >
                    {pagesContentCreator[url]}
                  </LinkButton>
                ))
              ]

            ]
            : [
              Object.keys(pagesLoggedOut).map((url) => (
                <LinkButton
                  key={url}
                  variant="text"
                  component={RouterLink}
                  to={url}
                >
                  {pagesLoggedOut[url]}
                </LinkButton>
              ))
            ]
          }
        </Stack>
      </Box>
      {user.user
        ? [
          <Box>
            <IconButton onClick={handleOpenSetMenu}>
              <AvatarMale />
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
              <MenuList
                id="composition-menu"
                aria-labelledby="composition-button"
              >
                <MenuItem key="profile" onClick={handleCloseSetMenu}>Profile</MenuItem>
                <MenuItem key="logout" onClick={handlelogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ]
        : [
          <Box>
            <IconButton onClick={handleOpenSetMenu}>
              <AvatarMale />
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
        ]
      }
    </Stack>
  );
}

export default connect()(Header);