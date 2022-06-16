import * as React from 'react';
import {Stack} from "@mui/material";
import RatingDialog from './rating_dialog';
import ReportDialog from './report_dialog';



export default function ProfileDialogButtons(){
    return(
        <Stack direction="column" spacing={4}>
            <RatingDialog>

            </RatingDialog>
            <ReportDialog>

            </ReportDialog>
        </Stack>
    )
}