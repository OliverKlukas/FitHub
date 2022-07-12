import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Review from "../components/profilecomponents/reviewlist/review";
import StarIcon from "@mui/icons-material/Star";
import RatingDialog from "../components/profilecomponents/popups/rating_dialog"
import ReportDialog from "../components/profilecomponents/popups/report_dialog";
import UserService from "../services/userService";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import UploadButton from "../components/buttons/upload_button";
import { HighlightButton } from "../components/buttons/highlight_button";
import { deleteUser, updateUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";

/**
 * Provile View, gets rendered empty, then fetches data from backend and fills itself up with it
 * @param {*} props for user management
 * @returns 
 */
function Profile(props) {
  const params = useParams()
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  // state for backenddata, since we do not want to store all profiles in a global redux state
  const [data, setdata] = React.useState({
    name: "",
    title: "",
    isOwnProfile: false,
    isContentCreator: false,
    profilePicture: "",
    avgReviewRating: 0,
  });
  // state for review data
  const [reviews, setReviews] = React.useState([]);
  // own state for uploaded picture, in case of update
  const [uploadedPicture, setUploadedPicture] = React.useState("");
  // own state for title, in case of update
  const [title, setTitle] = React.useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async () => {
    const temp = {
      name: data.name,
      title: title,
      profilePicture: uploadedPicture[0],
      _id: user.user._id
    }
    await props.dispatch(updateUser(temp))
    window.location.reload(false);
  }
  const handleDelete = async () => {
    await props.dispatch(deleteUser());
    navigate("/discovery");
  }

  useEffect(() => {
    async function fetchData() {
      if (user.user) {
        const res = await UserService.userdataloggedin(params.id, user.user.email);
        const temp = {
          name: `${res.firstname} ${res.lastname}`,
          title: res.title,
          isOwnProfile: res.isOwnProfile,
          isContentCreator: res.role === "contentCreator",
          profilePicture: res.profilePicture,
          avgReviewRating: res.avgReviewRating
        }
        setReviews(res.reviews);
        setdata(temp);
      } else {
        const res = await UserService.userdata(params.id);
        const temp = {
          name: `${res.firstname} ${res.lastname}`,
          title: res.title,
          isOwnProfile: res.isOwnProfile,
          isContentCreator: res.role === "contentCreator",
          profilePicture: res.profilePicture,
          avgReviewRating: res.avgReviewRating
        }
        setReviews(res.reviews);
        setdata(temp);
      }
    }
    fetchData();
    setTitle(data.title);
  }, [setdata, params.id, user.user]);

  return (
    <Box
      sx={{
        minwidth: "300",
        maxwidth: "300",
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={14} >
          {(data.profilePicture === "") ?
            <Box
              key="ImageUploadButton"
              sx={{
                height: 350,
                width: 525,
                maxHeight: { xs: 350, md: 251 },
                maxWidth: { xs: 525, md: 375 },
              }} Box>
              <Typography variant="h4">Upload a Profile Picture</Typography>
              <UploadButton
                id="profilePictureUpload"
                uploadFormat="image/*"
                givenId="profilePicture-Upload"
                multiUpload={false}
                setUpload={setUploadedPicture}
              />
            </Box>
            : <Box
              key="Image"
              component="img"
              sx={{
                height: 350,
                width: 525,
                maxHeight: { xs: 350, md: 251 },
                maxWidth: { xs: 525, md: 375 },
              }}
              src={data.profilePicture}
            />
          }
          <Stack direction="column" spacing={2}>
            <h1>{data.name}</h1>
            {
              data.isOwnProfile ? [
                <TextField
                  id="outlined-basic"
                  label="Edit Title and Update to save"
                  key={"editableProfileTitle"}
                  variant="outlined"
                  multiline
                  minRows={2}
                  maxRows={2}
                  defaultValue={data.title}
                  onChange={onChangeTitle}
                  sx={{
                    width: "120%",
                  }}
                ></TextField>
              ] : [
                <Typography
                  variant="body1"
                  key={"ownprofiletitle"}
                  sx={{
                    width: "60%",
                  }}
                  gutterBottom
                >
                  {data.title}
                </Typography>
              ]}
            {data.isContentCreator ?
              <Stack direction="row" spacing={3}>
                <Rating
                  name="read-only"
                  value={data.avgReviewRating}
                  readOnly
                  icon={<StarIcon color="warning"></StarIcon>}
                />
                <Typography variant="caption">
                  {reviews.length} reviews
                </Typography>
              </Stack> : []}
          </Stack>
          {data.isOwnProfile ? [
            <Box
              key="UpdateProfileContainer"
              sx={{
                width: "60%",
                height: "20%"
              }}
            >
              <Stack direction="column" spacing={3}>
                <HighlightButton
                  key="UpadteProfileButton"
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={uploadedPicture === "" &&
                    title === ""
                  }
                >
                  Save Changes
                </HighlightButton>
                <HighlightButton
                  key="DeleteAccountButton"
                  variant="contained"
                  onClick={handleDelete}>
                  Delete Account
                </HighlightButton>
                {(data.profilePicture === "") ? []

                  : [
                    <UploadButton
                      id="profilePictureUpload"
                      uploadFormat="image/*"
                      givenId="profilePicture-Upload"
                      multiUpload={false}
                      setUpload={setUploadedPicture}
                    />
                  ]
                }
              </Stack>
            </Box>
          ] :
            [data.isContentCreator ? <Stack direction="column" spacing={4}>
              <RatingDialog id={params.id}></RatingDialog>
              <ReportDialog></ReportDialog>
            </Stack> : [

            ]

            ]
            }
        </Stack>
        <Divider variant="fullWidth"></Divider>
        <Box
          sx={{
            width: "90%",
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >

            {data.isContentCreator ? [
              (reviews.length < 1) ? [] : [
                reviews.map((review) => {
                  return Review(
                    review.creatorId,
                    review.text,
                    review.date,
                    review.title,
                    review.star
                  );
                })]
            ] : []
            }
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default connect()(Profile);
