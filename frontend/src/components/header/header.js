import {Link, Stack} from "@mui/material";
import {ReactComponent as AvatarFemale} from "../../resources/avatar_female.svg";
import {ReactComponent as AvatarMale} from "../../resources/avatar_male.svg";
import {ReactComponent as Logo} from "../../resources/logo_standard.svg";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';


export function Header(props) {

    // Options for settings and page navigation menus.
    const settings = ['profile', 'contact', 'logout'];
    let pages = [];
    if (props.user_type === "content_creator") {
        pages = ['discovery', 'upload', 'about'];
    } else {
        pages = ['discovery', 'plans', 'about'];
    }

    // Handle navigation menu actions.
    const [anchorElSet, setAnchorElSet] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Handle settings menu actions.
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenSetMenu = (event) => {
        setAnchorElSet(event.currentTarget);
    };
    const handleCloseSetMenu = () => {
        setAnchorElSet(null);
    };

    return (
        <Stack direction="row" justifyContent="space-evenly" alignContent="center" my="2vh" mx="2vw">
            <Container>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <Link href="/">
                        <Logo/>
                    </Link>
                </Box>
                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
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
                        {pages.map((page) => (
                            <MenuItem key={page} href={page} onClick={handleCloseNavMenu}>
                                <Link href={page} underline="hover" color="inherit">
                                    {page}
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Container>
            <Container>
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    <Link href="/discovery">
                        <Logo/>
                    </Link>
                </Box>
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {pages.map((page) => (
                        <Link key={page} href={page} underline="hover" color="inherit">
                            <h3>
                                {page}
                            </h3>
                        </Link>
                    ))}
                </Box>
            </Container>

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
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseSetMenu}>
                            <Link href={setting} underline="hover" color="inherit">
                                {setting}
                            </Link>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Stack>);
}
