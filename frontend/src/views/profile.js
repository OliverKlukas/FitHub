import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Review from "../components/profilecomponents/reviewlist/review";
import { loremIpsum } from "react-lorem-ipsum";
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
    description: "",
    isOwnProfile: false,
    isContentCreator: false,
    profilePicture: "",
  });
  // own state for uploaded picture, in case of update
  const [uploadedPicture, setUploadedPicture] = React.useState("");
  // own state for description, in case of update
  const [description, setDescription] = React.useState("");

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = async() => {
    const temp = {
        name: data.name,
        description: description,
        profilePicture: uploadedPicture[0],
        _id: user.user._id
    }
    await props.dispatch(updateUser(temp))
    window.location.reload(false);
  }
  const handleDelete = async () => {
    await props.dispatch(deleteUser(user.user._id))
    navigate("/discovery") 
  }

  useEffect(() => {
    async function fetchData() {
      if (user.user) {
        const res = await UserService.userdataloggedin(params.firstName, params.lastName, user.user.email);
        const temp = {
          name: `${res.firstname} ${res.lastname}`,
          description: res.description,
          isOwnProfile: res.isOwnProfile,
          isContentCreator: res.role === "contentCreator",
          profilePicture: res.profilePicture
        }
        setdata(temp)
      } else {
        const res = await UserService.userdataloggedin(params.firstName, params.lastName, user.user.email);
        const temp = {
          name: `${res.firstname} ${res.lastname}`,
          description: res.description,
          isOwnProfile: res.isOwnProfile,
          isContentCreator: res.role === "contentCreator",
          profilePicture: res.profilePicture
        }
        setdata(temp)
      }
    }
    fetchData()
  }, [setdata,params.firstName,params.lastName,user.user]);

  const reviews = [
    {
      author: "Terry Pratched",
      text: loremIpsum(),
      title: "Creates great training plans",
      date: "18.03.2021",
      star: 5,
    },
    {
      author: "Brandon Sanderson",
      text: loremIpsum(),
      title: "Does not have the best Workout Systems",
      date: "13.01.2022",
      star: 3,
    },
    {
      author: "Karen Kardashian",
      text: loremIpsum(),
      title: "If I could give 0 stars I would",
      date: "10.05.2021",
      star: 1,
    },
  ];

  const ratings =
    []; /* Needed to use reduce over the array to calculate Rating */
  for (const item of reviews) {
    ratings.push(item.star);
  }
  return (
    <Box
      sx={{
        minwidth: "300",
        maxwidth: "300",
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={14}>
          {(data.isContentCreator) ?
            <Box
              key="ContentCreatorImage"
              component="img"
              sx={{
                height: 350,
                width: 525,
                maxHeight: { xs: 350, md: 251 },
                maxWidth: { xs: 525, md: 375 },
              }}
              src={data.profilePicture}
            />
            : <Box
              key="ContentCreatorImage"
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
          }
          <Stack direction="column" spacing={2}>
            <h1>{data.name}</h1>
            {data.isOwnProfile ? [
              <TextField
                id="outlined-basic"
                label="Edit Description and Update to save"
                key={"editableProfileDescription"}
                variant="outlined"
                multiline
                minRows={5}
                maxRows={5}
                defaultValue={data.description}
                onChange={onChangeDescription}
                sx={{
                  width: "150%",
                }}
              ></TextField>
            ] : [
              <Typography
                variant="body1"
                key={"ownprofiledescription"}
                sx={{
                  width: "60%",
                }}
                gutterBottom
              >
                {data.description}
              </Typography>
            ]}
            {data.isContentCreator ?
              <Stack direction="row" spacing={3}>
                <Rating
                  name="read-only"
                  value={
                    ratings.reduce((p, c) => {
                      return p + c;
                    }) / reviews.length
                  }
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
                  description === ""
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
              </Stack>
            </Box>
          ] :
            [data.isContentCreator ? <Stack direction="column" spacing={4}>
              <RatingDialog></RatingDialog>
              <ReportDialog></ReportDialog>
            </Stack> : [

            ]

            ]}
        </Stack>
        {(data.isContentCreator && data.isOwnProfile) ?
          <UploadButton
            id="profilePictureUpload"
            uploadFormat="image/*"
            givenId="profilePicture-Upload"
            multiUpload={false}
            setUpload={setUploadedPicture}
          />
          : [

          ]
        }
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

            {data.isContentCreator ?
              // maps over the reviews array and returns a review for each review
              reviews.map((review) => {
                // eslint-disable-next-line new-cap
                return Review(
                  review.author,
                  review.text,
                  review.date,
                  review.title,
                  review.star
                );
              }) : []}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default connect()(Profile);