import {Popover, Slider, Stack, Typography} from "@mui/material";
import * as React from "react";
import {LinkButton} from "../buttons/link_button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function SlideFilter({priceRange, setPriceRange}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'slide-popover' : undefined;
    const minPriceRange = 10;

    // Handle changed range values of the slide.
    function handleSlide(event, newPriceRange, activeThumb) {
        // Slide has not moved.
        if (!Array.isArray(newPriceRange)) {
            return;
        }
        // Correct thumb positions if new positions of them surpasses the minDistance.
        if (newPriceRange[1] - newPriceRange[0] < minPriceRange) {
            if (activeThumb === 0) {
                const clamped = Math.min(newPriceRange[0], 100 - minPriceRange);
                setPriceRange([clamped, clamped + minPriceRange]);
            } else {
                const clamped = Math.max(newPriceRange[1], minPriceRange);
                setPriceRange([clamped - minPriceRange, clamped]);
            }
        } else {
            setPriceRange(newPriceRange);
        }
    }

    // Handle opening/closing of the slide popover.
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            <h4 style={{margin: "13px"}}>
                Desired price range:
            </h4>
            <Stack alignItems="center" sx={{mx: 4}}>
                <Slider
                    sx={{width: 200}}
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={priceRange}
                    onChange={handleSlide}
                    valueLabelDisplay="auto"
                    disableSwap
                />
                <Typography fontSize={18} marginY={1.5} fontWeight={800}>
                    {priceRange[0]} - {priceRange[1]} €
                </Typography>
                <Typography color="secondary.main" marginBottom={1} fontSize={13}>Total price including taxes &
                    fees.</Typography>
            </Stack>
        </Popover>
    </div>);
}