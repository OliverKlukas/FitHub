import {Link, Stack} from "@mui/material";
import Button from '@mui/material/Button';
import {ReactComponent as AvatarFemale} from "../../resources/avatar_female.svg";
import {ReactComponent as AvatarMale} from "../../resources/avatar_male.svg";
import {ReactComponent as Logo} from "../../resources/logo_standard.svg";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import {Link as RouterLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {HighlightButton} from "../buttons/highlight_button";
import {LinkButton} from "../buttons/link_button";

export function Header(props) {
    // Handle navigation menu actions.
    let pages;
    if (props.user_type === "content-creator") {
        pages = {
            "discovery": "Discovery",
            "upload": "Offer Content",
            "about": "About us"
        };
    } else {
        pages = {
            "discovery": "Discovery",
            "plans": "My Plans",
            "about": "About us"
        };
    }
    const [anchorElSet, setAnchorElSet] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Handle settings menu actions.
    const settings = {
        "profile": "Profile",
        "contact": "Contact",
        "logout": "Logout"
    };
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenSetMenu = (event) => {
        setAnchorElSet(event.currentTarget);
    };
    const handleCloseSetMenu = () => {
        setAnchorElSet(null);
    };

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" my="2vh" mx="2vw">
            <Box>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <Link href="/discovery">
                        <Logo/>
                    </Link>
                </Box>
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        {Object.keys(pages).map((url) => (
                            <MenuItem key={url} onClick={handleCloseNavMenu}>
                                <Link href={url} underline="hover" color="inherit">
                                    {pages[url]}
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>
            <Box>
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    <Link href="/discovery">
                        <Logo/>
                    </Link>
                </Box>
                <Stack direction="row" spacing={4} pr={16} sx={{display: {xs: 'none', md: 'flex'}}}>
                    {Object.keys(pages).map((url) => (
                        <LinkButton
                            key={url}
                            variant='text'
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
                    {props.gender === "male" ? <AvatarMale/> : <AvatarFemale/>}
                </IconButton>
                <Menu
                    sx={{mt: '60px'}}
                    id="menu-appbar"
                    anchorEl={anchorElSet}
                    anchorOrigin={{
                        vertical: 'top', horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top', horizontal: 'right',
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
