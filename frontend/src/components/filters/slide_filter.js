import { Popover, Slider, Stack, Typography } from "@mui/material";
import * as React from "react";
import { LinkButton } from "../buttons/link_button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

/**
 * Single slide filter component offering range selection for one number value.
 *
 * @param priceRange - Number[lower value, higher value] that sets the boundaries for filtered value.
 * @param setPriceRange - Hook reference to set the priceRange.
 * @return {JSX.Element}
 */
export default function SlideFilter({
  priceRange,
  setPriceRange,
  setPriceFiltered,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "slide-popover" : undefined;
  const minPriceRange = 10;

  // Handle changed range values of the slide, copied from: https://mui.com/material-ui/react-slider/#MinimumDistanceSlider.js
  function handleSlide(event, newPriceRange, activeThumb) {
    // Slide has not moved.
    if (!Array.isArray(newPriceRange)) {
      return;
    }
    // Correct thumb positions if new positions of them surpasses the minDistance.
    if (newPriceRange[1] - newPriceRange[0] < minPriceRange) {
      if (activeThumb === 0) {
        const clamped = Math.min(newPriceRange[0], 250 - minPriceRange);
        setPriceRange([clamped, clamped + minPriceRange]);
      } else {
        const clamped = Math.max(newPriceRange[1], minPriceRange);
        setPriceRange([clamped - minPriceRange, clamped]);
      }
    } else {
      console.log(priceRange);
      setPriceRange(newPriceRange);
    }
    // Set chip for price filter.
    setPriceFiltered(true);
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <LinkButton variant="text" onClick={handlePopoverOpen}>
        <Stack
          width={200}
          height={48}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color={"secondary"} fontWeight={600} fontSize={20}>
            Price
          </Typography>
          {open ? (
            <ArrowDropUpIcon sx={{ color: "#757575" }} />
          ) : (
            <ArrowDropDownIcon style={{ color: "#757575" }} />
          )}
        </Stack>
      </LinkButton>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
      >
        <Typography variant="h4" style={{ margin: "13px" }}>
          Desired price range:
        </Typography>
        <Stack alignItems="center" sx={{ mx: 4 }}>
          <Slider
            sx={{ width: 200 }}
            getAriaLabel={() => "Minimum distance shift"}
            value={priceRange}
            onChange={handleSlide}
            max={250}
            valueLabelDisplay="auto"
            disableSwap
          />
          <Typography fontSize={18} marginY={1.5} fontWeight={800}>
            {priceRange[0]} - {priceRange[1]} €
          </Typography>
          <Typography color="secondary.main" marginBottom={1} fontSize={13}>
            Total price including taxes & fees.
          </Typography>
        </Stack>
      </Popover>
    </div>
  );
}
