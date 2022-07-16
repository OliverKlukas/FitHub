import React, { useEffect } from "react";
import { Link, Stack, Badge } from "@mui/material";
import { ReactComponent as Avatar } from "../../resources/avatar.svg";
import { ReactComponent as Logo } from "../../resources/logo_standard.svg";
import { ReactComponent as LogoSmall } from "../../resources/logo_small.svg";
import { ReactComponent as LogoText } from "../../resources/logo_text.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuList from "@mui/material/MenuList";
import { LinkButton } from "../buttons/link_button";
import { useSelector, connect } from "react-redux";
import { logout } from "../../redux/actions";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationService from "../../services/notificationsService";

/**
 *  Header bar component that is visible on all views.
 *
 * @param {props} props - for user state management
 * @return {JSX.Element}
 */
function Header(props) {
  // Needed for user state management
  const user = useSelector((state) => state.user);
  // Names needed for Link to Own Profile, get set with useEffect()
  const [id, setid] = React.useState("");
  // state for new Reviews
  const [newReviews, setNewReviews] = React.useState(0);
  // state for new Messages
  const [newMessages, setNewMessages] = React.useState(0);

  useEffect(() => {
    async function fetchNotifications() {
      const res = await NotificationService.getNewNotifications();
      if (isNaN(res.newReviewsCounter)) {
      } else {
        setNewReviews(res.newReviewsCounter);
      }
      if (isNaN(res.newMessagesCounter)) {
      } else {
        setNewMessages(res.newMessagesCounter);
      }
    }

    if (user.user) {
      setid(user.user._id);
      fetchNotifications();
    }
  }, [id, newMessages, newReviews, user.user]);

  // Get pages depending und user status.
  const getNavigationLinks = () => {
    if (user.user) {
      if (user.user.role === "customer") {
        return [
          ["discovery", "Discovery"],
          ["plans", "My Content"],
          ["about", "About Us"],
        ];
      } else {
        return [
          ["discovery", "Discovery"],
          ["dashboard", "My Content"],
          ["about", "About Us"],
        ];
      }
    }
    return [
      ["discovery", "Discovery"],
      ["signin", "Sign In"],
      ["about", "About Us"],
    ];
  };

  // Sub-urls and link names for available user menu options when the user is not logged in
  const settings = {
    contact: "Contact",
    signin: "Sign in",
    signup: "Sign up",
  };

  // Anchors to control open/close of pop up menus in header.
  const [anchorSettings, setAnchorSettings] = React.useState(null);
  const [anchorNavigation, setAnchorNavigation] = React.useState(null);
  const [anchorNotifications, setAnchorNotifications] = React.useState(null);

  // Logout and change redux state.
  const handleLogout = () => {
    props.dispatch(logout);
    window.location.reload();
    return false;
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      my={2}
    >
      <Box key={"left-header-part"}>
        <Box key={"md-logo"} sx={{ display: { xs: "none", md: "flex" } }}>
          <Link
            href={
              user.user
                ? [
                    user.user.role === "contentCreator"
                      ? "/landing"
                      : "/discovery",
                  ]
                : "/discovery"
            }
          >
            <Logo />
          </Link>
        </Box>
        <Box key={"xs-nav-menu"} sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event) => setAnchorNavigation(event.currentTarget)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorNavigation}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorNavigation)}
            onClose={() => setAnchorNavigation(null)}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {getNavigationLinks().map((item, index) => (
              <MenuItem key={index} onClick={() => setAnchorNavigation(null)}>
                <Link href={item[0]} underline="none" color="inherit">
                  {item[1]}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <Box key={"middle-header-part"}>
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
          {getNavigationLinks().map((item, index) => (
            <LinkButton
              key={index}
              variant="text"
              component={RouterLink}
              to={item[0]}
            >
              {item[1]}
            </LinkButton>
          ))}
        </Stack>
      </Box>
      <Stack direction={"row"} alignItems={"center"} key={"right-header-part"}>
        {user.user && (
          <Box>
            <IconButton
              onClick={(event) => setAnchorNotifications(event.currentTarget)}
            >
              <Badge
                badgeContent={newMessages + newReviews}
                max={99}
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                color="warning"
              >
                <NotificationsNoneOutlinedIcon
                  color={"primary"}
                  fontSize="large"
                />
              </Badge>
            </IconButton>
            <Menu
              sx={{ mt: "60px" }}
              id="notifications-appbar"
              anchorEl={anchorNotifications}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorNotifications)}
              onClose={() => setAnchorNotifications(null)}
            >
              <MenuList
                id="notifications-menu"
                aria-labelledby="notification-button"
              >
                {newMessages > 0 ? (
                  <MenuItem
                    key="messages"
                    onClick={() => setAnchorNotifications(null)}
                  >
                    {/*TODO: replace /profile/${id} with the link to the messages of the user*/}
                    <Link
                      href={`/profile/${id}`}
                      underline="none"
                      color="inherit"
                    >
                      You have {newMessages} new Messages!
                    </Link>
                  </MenuItem>
                ) : (
                  []
                )}
                {newReviews > 0 ? (
                  <MenuItem
                    key="reviews"
                    onClick={() => setAnchorNotifications(null)}
                  >
                    <Link
                      href={`/profile/${id}`}
                      underline="none"
                      color="inherit"
                    >
                      You have {newReviews} new Reviews!
                    </Link>
                  </MenuItem>
                ) : (
                  []
                )}
              </MenuList>
            </Menu>
          </Box>
        )}
        <IconButton onClick={(event) => setAnchorSettings(event.currentTarget)}>
          <Avatar />
        </IconButton>
        <Menu
          sx={{ mt: "60px" }}
          id="menu-appbar"
          anchorEl={anchorSettings}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorSettings)}
          onClose={() => setAnchorSettings(null)}
        >
          {user.user ? (
            <MenuList
              id="composition-menu"
              aria-labelledby="composition-button"
            >
              <MenuItem key="profile" onClick={() => setAnchorSettings(null)}>
                <Link href={`/profile/${id}`} underline="none" color="inherit">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem key="logout" onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          ) : (
            <MenuList>
              {Object.keys(settings).map((url) => (
                <MenuItem key={url} onClick={() => setAnchorSettings(null)}>
                  <Link key={url} href={url} underline="none" color="inherit">
                    {settings[url]}
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
          )}
        </Menu>
      </Stack>
    </Stack>
  );
}

export default connect()(Header);
