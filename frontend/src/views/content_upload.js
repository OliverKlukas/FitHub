import * as React from 'react';
import {Grid, Stack, Typography, Link, Snackbar} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import EuroSymbol from "@mui/icons-material/Euro";
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import {StandardButton} from "../components/buttons/standard_button";
import {CancelButton} from "../components/buttons/cancel_button";
import Autocomplete from '@mui/material/Autocomplete';
import UploadButton from '../components/buttons/upload_button';
import {useNavigate, useParams} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';


const preInputValue = "Type here...";
const fitnessGoal = ['weight-loss', 'weight-gain', 'muscle-growth', 'cardio'];
const fitnessLevel = ['beginner', 'advanced', 'professional'];
const lifestyle = ['vegan', 'vegetarian', 'pescatarian', 'meat-based'];

function ContentUpload(){
  let {option} = useParams();  

  let navigate = useNavigate();

  function handleCancelSubmit(event) {
    event.preventDefault();  
      navigate(`/landing`);
      
  } 

  return(
        
    <Stack spacing={2}> 

    <Grid item container paddingLeft="1px" paddingRight="25px" paddingBottom="25px" backgroundColor="#EEEEEE" borderRadius="8px" spacing={2} width="90%" justifyContent="flex-start">

      <Grid item xs={12}> 
      <Typography variant="h1" fontWeight="bold">
        Offer your Content
      </Typography> </Grid>

      <Grid item xs={12}> <Typography variant="h3" >General Information</Typography> </Grid>
      <Grid item xs={12}> 
      <FormControl>
      <Stack spacing={3} direction="row" alignItems="center">
      <Grid item sx={{minWidth: 100}}>
            <Typography variant="subtitle1" fontWeight="bold">Category:</Typography>
        </Grid>
      <RadioGroup
        row
        aria-labelledby="category-radio-buttons-group-label"
        defaultValue = { option ? option : "training"}
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="training" control={<Radio />} label="Training Plan" />
        <FormControlLabel value="nutrition" control={<Radio />} label="Nutrition Plan" />
        <FormControlLabel value="coaching" control={<Radio />} label="Coaching" />
      </RadioGroup>
      </Stack>
    </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} direction="row" alignItems="baseline">
        <Grid item sx={{minWidth: 100}}>
        <Typography variant="subtitle1" fontWeight="bold">Title:</Typography>
        </Grid>
      <TextField
          //error
          id="title-input"
          placeholder = {preInputValue}
          multivalue
          helperText="Please enter a short and catchy title that best describes your fitness offering"
          variant="filled"
          size="small"
        />
        </Stack> 
      </Grid>
      <Grid item xs={4}>
      <Stack spacing={2} direction="row" alignItems="baseline">
        <Grid item sx={{minWidth: 100}}>
        <Typography variant="subtitle1" fontWeight="bold">Price:</Typography>
        </Grid>
      <TextField
          //error
          id="price-input"
          placeholder = {preInputValue}
          multivalue 
          helperText="Prices must include VAT and represent the total costs you expect buyers to pay"
          variant="filled"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EuroSymbol />
              </InputAdornment>
            ),
          }}
        />
        </Stack>
      </Grid>
      <Grid item xs={12}>
      <Stack spacing={2} direction="row" alignItems="baseline">
        <Grid item sx={{minWidth: 100}}>
        <Typography variant="subtitle1" fontWeight="bold">Description:</Typography>
        </Grid>
      <TextField
          //error
          id="description-input"
          multiline
          rows={4}
          variant="filled"
          placeholder = {preInputValue}
          size="small"
          helperText="Please enter a description that conveys what buyers can expect from this offering"
        />
        </Stack>
      </Grid>
      
      <Grid item xs={12}>
      <Stack spacing={2} direction="row" alignItems="center">
        <Grid item sx={{minWidth: 100}}>
        <Typography variant="subtitle1" fontWeight="bold">Scope:</Typography>
        </Grid>
      <Stack spacing = {2} direction="row">
      <Grid>
      <TextField
          id="duration-input"
          label="Duration"
          multiline
          variant="filled"
          placeholder = {preInputValue}
          helperText="amount of weeks"
          size="small"
        />
      </Grid>
      <Grid>
      <TextField
          id="intensity-input"
          label="Intensity"
          multiline
          variant="filled"
          placeholder = {preInputValue}
          helperText="trainings per week"
          size="small"
        />
        </Grid>
        </Stack>
        </Stack>
        </Grid>
        
        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Grid item sx={{minWidth: 100}}>
            <Typography variant="subtitle1" fontWeight="bold">Tags:</Typography>
            </Grid>
            <Grid item sx={{minWidth: 250, maxWidth: 400}}>
            <Stack spacing ={3}>
            <Autocomplete
             multiple
             id="goal-tags"
             options={fitnessGoal}
             renderInput={(params) => (
              <TextField
                {...params}
                label="Fitness Goal"
              />
             )}
             />
            <Autocomplete
             multiple
             id="goal-tags"
             options={lifestyle}
             renderInput={(params) => (
              <TextField
                {...params}
                label="Lifestyle"
              />
             )}
             />
             </Stack>
            </Grid>
           <Grid item sx={{minWidth: 250, maxWidth: 300}}>
           <Stack spacing ={3}>
            <Autocomplete
             multiple
             id="level-tags"
             options={fitnessLevel}
             renderInput={(params) => (
              <TextField
                {...params}
                label="Fitness Level"
              />
             )}
             />
             <Typography variant="body2" fontSize="small">
              Please type and select fitting tags for your content offering. 
              These will be used to better reach your target user group on FitHub. 
             </Typography>
             </Stack>
           </Grid>
          </Stack>
        </Grid>


        <Grid item xs={12}>
        <Typography variant="h3">Uploads</Typography>
        </Grid>

        <Grid item xs={12}>
        <Stack spacing = {2} direction="row">
           <Grid item sx={{minWidth: 200}}>
           <Typography variant="subtitle1">Marketing Material:</Typography>
           </Grid>

           <Stack spacing = {1}>
           <UploadButton id="markting-upload" uploadFormat="image/*" givenId="marketing-upload" multiUpload={true}/>
           <Grid xs={4.5}>
           <Typography variant="body2" fontSize="small">Please upload pictures that represents your offer (example dishes, workouts etc). Be aware and respect our <Link color="#393E46" fontSize={14} fontWeight={300} underline="always" href="/terms-and-conditions">Terms & Conditions</Link> including image rights</Typography>
           </Grid>
           </Stack>
        </Stack>
        </Grid>

        <Grid item xs={12}>
        <Stack spacing = {2} direction="row">
        <Grid item sx={{minWidth: 200}}>
           <Typography variant="subtitle1">Full Plan:</Typography>
           </Grid>
           <Stack spacing = {1}>
           <UploadButton uploadFormat=".pdf" givenId="plan-upload" multiUpload={false}/>
           <Grid xs={5}>
           <Typography variant="body2" fontSize="small">Please upload the pdf file that contains the complete training plan that buyers are going to receive</Typography>
           </Grid>
           </Stack>
        </Stack>
        </Grid>
        
        <Grid item xs={12}>
        <Stack spacing = {2} direction="row">
        <Grid item sx={{minWidth: 200}}>
           <Typography variant="subtitle1">Sample:</Typography>
           </Grid>
           <Stack spacing = {1}>
           <UploadButton uploadFormat=".pdf" givenId="sample-upload" multiUpload={false}/>
           <Grid xs={5}>
           <Typography variant="body2" fontSize="small">Please upload a sample pdf file which gives buyers an impression of the full plan</Typography>
           </Grid>
           </Stack>
        </Stack>
        </Grid>


        <Grid item xs={12}>
        <Typography variant="h3">Legal Notices</Typography>
        </Grid>
        <Grid item xs={10}>
        <Stack item spacing={0.5}>
        <Stack direction="row" alignItems="center">
             <Checkbox />
             <Typography variant="body1">Yes, EMail me for marketing events like vouchers & sales weekends</Typography>
        </Stack>
          <Stack direction="row" alignItems="center">
          <Checkbox />
             <Typography variant="body1">Yes, I am offering full-time support for the buyers</Typography>
          </Stack>
        <Stack direction="row" alignItems="center">
        <Checkbox />
          <Typography variant="body1">Yes, I ensure delivery of the expected quality and know intentional fooling attempts will result in penalties like an account ban</Typography>
          </Stack>
        <Stack direction="row" alignItems="center">
        <Checkbox />
          <Typography variant="body1">Yes, I hereby accept the <Link color="#393E46" fontSize={14} fontWeight={300} underline="always" href="/terms-and-conditions">Terms & Conditions</Link> of FitHub</Typography>
          </Stack>
        </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
          <form onSubmit={handleCancelSubmit}>
          <FormControl>
            <CancelButton variant="contained" type="submit">
                    Cancel
            </CancelButton>
            </FormControl>
          </form>
            <StandardButton variant="contained">
              Publish
            </StandardButton>
          </Stack>
        </Grid>
    </Grid>
    </Stack>
    )
}

export default ContentUpload;