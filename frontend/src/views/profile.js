import { Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Stack, TextField, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Review from "../components/profilecomponents/reviewlist/review";
import StarIcon from "@mui/icons-material/Star";
import RatingDialog from "../components/profilecomponents/popups/rating_dialog";
import ReportDialog from "../components/profilecomponents/popups/report_dialog";
import UserService from "../services/userService";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import UploadButton from "../components/buttons/upload_button";
import { HighlightButton } from "../components/buttons/highlight_button";
import { deleteUser, updateUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/profilecomponents/popups/confirm_dialog";

/**
 * Provile View, gets rendered empty, then fetches data from backend and fills itself up with it
 * @param {*} props for user management
 * @returns
 */
function Profile(props) {
  const params = useParams();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  // state for backenddata, empty on first render, updated via useEffect, this is more scalable than storing
  // all userdata in the redux store
  const [data, setdata] = React.useState({
    name: "",
    title: "",
    isOwnProfile: false,
    isContentCreator: false,
    profilePicture: "",
    avgReviewRating: 0,
  });
  // state for confirmation Dialog
  const [confirmOpen, setConfirmOpen] = React.useState(false);
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
      _id: user.user._id,
    };
    await props.dispatch(updateUser(temp));
    window.location.reload(false);
  };
  const handleDelete = async () => {
    await props.dispatch(deleteUser());
    navigate("/discovery");
  };

  // this check can be circumvented, but is sufficient, since the update/delete calls check for authentication
  // and therefore always update/delete the own profile
  useEffect(() => {
    async function fetchData() {
      if (user.user) {
        const res = await UserService.userdataloggedin(
          params.id,
          user.user.email
        );
        const temp = {
          name: `${res.firstname} ${res.lastname}`,
          title: res.title,
          isOwnProfile: res.isOwnProfile,
          isContentCreator: res.role === "contentCreator",
          profilePicture: res.profilePicture,
          avgReviewRating: res.avgReviewRating,
        };
        setReviews(res.reviews);
        setdata(temp);
        if (data.isOwnProfile) {
          await UserService.cleanReviewCounter();
        }
      } else {
        const res = await UserService.userdata(params.id);
        const temp = {
          name: `${res.firstname} ${res.lastname}`,
          title: res.title,
          isOwnProfile: res.isOwnProfile,
          isContentCreator: res.role === "contentCreator",
          profilePicture: res.profilePicture,
          avgReviewRating: res.avgReviewRating,
        };
        setReviews(res.reviews);
        setdata(temp);
      }
    }
    fetchData();
    setTitle(data.title);
  }, [setdata, params.id, user.user, data.title]);

  return (
    <Stack>
      <Stack
        direction="row"
        spacing={22}
        paddingLeft={4}
        paddingBottom={6}
        width="100%"
      >
        {!(data.profilePicture === "") && (
          <Avatar
            sx={{
              width: "270px",
              height: "270px",
              boxShadow: 5,
            }}
            alt={data.name}
            src={data.profilePicture}
          />
        )}
        <Stack direction="column" spacing={4}>
          <h1>{data.name}</h1>
          {data.isOwnProfile ? (
            <Stack spacing={4} sx={{ width: 400 }}>
              <TextField
                label="Edit Title and Update to save"
                variant="outlined"
                multiline
                minRows={2}
                maxRows={2}
                defaultValue={data.title}
                onChange={onChangeTitle}
              />
              <UploadButton
                givenId="profilePictureUpload"
                buttonText="Upload profile picture"
                uploadFormat="image/*"
                multiUpload={false}
                setUpload={setUploadedPicture}
              />
            </Stack>
          ) : (
            <Typography variant="body1">{data.title}</Typography>
          )}
          {data.isContentCreator && !data.isOwnProfile && (
            <Stack
              direction="row"
              spacing={3}
              paddingTop={6}
              alignItems="center"
            >
              <Rating
                name="avgRating"
                value={data.avgReviewRating}
                readOnly
                icon={<StarIcon color="warning"></StarIcon>}
              />
              <Typography variant="caption">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack justifyContent="space-between" marginBottom={2}>
          {data.isOwnProfile && (
            <Stack spacing={4} marginTop={8}>
              <HighlightButton
                key="UpdateProfileButton"
                variant="contained"
                onClick={handleSubmit}
                sx={{ width: 200 }}
                disabled={uploadedPicture === "" && title === ""}
              >
                Save Changes
              </HighlightButton>
              <HighlightButton
                key="DeleteAccountButton"
                variant="contained"
                sx={{ width: 200 }}
                onClick={() => setConfirmOpen(true)}
              >
                Delete Account
              </HighlightButton>
              <ConfirmDialog
                title="Delete Account?"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={handleDelete}
              >
                Are you sure you want to delete your Account?
              </ConfirmDialog>
            </Stack>
          )}
          {data.isContentCreator && data.isOwnProfile && (
            <Stack direction="row" spacing={3} alignItems="center">
              <Rating
                name="avgRating"
                value={data.avgReviewRating}
                readOnly
                icon={<StarIcon color="warning"></StarIcon>}
              />
              <Typography variant="caption">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </Typography>
            </Stack>
          )}
        </Stack>
        {data.isContentCreator && user.user && !data.isOwnProfile && (
          <Stack direction="column" spacing={4} justifyContent="center">         
            <ReportDialog width={280}></ReportDialog>
            <RatingDialog width={280} id={params.id}></RatingDialog>
          </Stack>
        )}
      </Stack>

      <Divider variant="fullWidth" sx={{ borderColor: "#222381" }}></Divider>

      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        padding={2}
        marginTop={2}
      >
        {data.isContentCreator &&
          reviews.length > 0 &&
          reviews.map((review) => {
            return (
              <Review
                key={review.creatorId}
                reviewer={review.creatorId}
                text={review.text}
                date={review.date}
                title={review.title}
                starValue={review.star}
              />
            );
          })}
      </Stack>
    </Stack>
  );
}

export default connect()(Profile);
