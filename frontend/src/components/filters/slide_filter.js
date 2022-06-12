import {Popover, Slider, Stack, Typography} from "@mui/material";
import * as React from "react";
import {LinkButton} from "../buttons/link_button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from "@mui/material/Box";

export default function SlideFilter() {
    // TODO: STUFF FOR SLIDER
    const [value2, setValue2] = React.useState([20, 37]);

    function valuetext(value) {
        return `${value}€`;
    }

    const minDistance = 10;
    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
            setValue2(newValue);
        }
    };

    // TODO: STUFF FOR POPOVER
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (<div>
            <LinkButton
                variant='text'
                onClick={handleClick}
            >
                <Stack width={200} height={48} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color={"secondary"} fontWeight={600} fontSize={18}>
                        Price
                    </Typography>
                    {open ? <ArrowDropUpIcon sx={{color: '#757575'}}/> : <ArrowDropDownIcon style={{color: '#757575'}}/>}
                </Stack>
            </LinkButton>
            <Popover
                anchorOrigin={{
                    vertical: 'bottom', horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top', horizontal: 'center',
                }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <Slider
                    sx={{width: 200, my: 4.5, mx: 2}}
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={value2}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                />
            </Popover>
        </div>);
}