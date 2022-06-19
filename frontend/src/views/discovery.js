import * as React from 'react';
import {useState} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageCard from "../components/cards/image_card";
import {Stack, useMediaQuery} from "@mui/material";
import FilterBar from "../components/filters/fitler_bar";
import theme from "../utils/theme";
import {content} from "../utils/content";

/**
 * Discovery view component consisting a combinable filter bar and a filterable image list.
 *
 * @returns {JSX.Element}
 */
function Discovery() {
    // String[] of tags that the content list should currently be filtered for.
    const [filter, setFilter] = useState([]);

    // Number[] of price range that the content list should currently be filtered for.
    const [priceRange, setPriceRange] = React.useState([0, 100]);

    // Screen size hooks to responsively control the number of content columns.
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    return (<Stack>
        <FilterBar filter={filter} setFilter={setFilter} priceRange={priceRange} setPriceRange={setPriceRange}/>
        <ImageList
            sx={{
                // Promotes image list into its own layer in Chrome, costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)', overflow: 'hidden',
            }}
            cols={sm ? 1 : lg ? 2 : 3}
            gap={40}
        >
            {content.map((item) => {
                if (item.price >= priceRange[0] && item.price <= priceRange[1] && (filter.length === 0 || (item.tags.filter(tag => filter.includes(tag))).length === filter.length)) {
                    return <ImageCard item={item} key={item.img}/>
                }
            })}
        </ImageList>
    </Stack>)
}

export default Discovery;