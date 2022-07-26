import { StandardButton } from "../buttons/standard_button";
import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Enables upload of one or multiple files in a specific format and converts them to base64 strings.
 *
 * @param uploadFormat - string that specifies format of desired files, i.e. ".pdf"
 * @param givenId - string id of component
 * @param multiUpload - boolean indicating if multiple files should be uploadable
 * @param upload - value
 * @param setUpload
 * @returns {JSX.Element}
 * @constructor
 */
export default function UploadButton({
  uploadFormat,
  givenId,
  multiUpload,
  setUpload,
  buttonText = "Upload",
  buttonDescription = "Select a file",
}) {
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [uploadFail, setUploadFail] = React.useState(false);
  const [fileNames, setFileNames] = React.useState("");

  // Copied from: https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
        throw new Error(error.toString());
      };
    });
  };

  // Sets selected file and activates snackbar.
  async function handleUpload(event) {
    let newFileNames = "";
    const newUpload = [];
    let uploadSize = 0;

    // Convert files into base64 string representation and save file names separately.
    for (const file of event.target.files) {
      uploadSize += file.size;
      const base64file = await convertToBase64(file);
      newUpload.push(base64file);
      newFileNames = newFileNames.concat(file.name, " ");
    }

    if (uploadSize > 16000000) {
      setUploadFail(true);
    } else {
      setUpload(newUpload);
      setFileNames(newFileNames);
      setIsFilePicked(true);
      setSnackbar(true);
    }
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <label htmlFor={givenId}>
        <input
          style={{ display: "none" }}
          accept={uploadFormat}
          id={givenId}
          type="file"
          onChange={handleUpload}
          multiple={multiUpload}
        />
        <StandardButton variant="contained" component="span" upload="true">
          {buttonText}
        </StandardButton>
      </label>
      {isFilePicked ? (
        <Typography minWidth={100} variant="body2" fontSize="small">
          {fileNames}
        </Typography>
      ) : (
        <Typography minWidth={100} variant="body2" fontSize="small">
          {buttonDescription}
        </Typography>
      )}
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={() => setSnackbar(false)}
      >
        <Alert
          onClose={() => setSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successful upload
        </Alert>
      </Snackbar>
      <Snackbar
        open={uploadFail}
        autoHideDuration={6000}
        onClose={() => setUploadFail(false)}
      >
        <Alert
          onClose={() => setUploadFail(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Upload size too big! Max size is 16MB
        </Alert>
      </Snackbar>
    </Stack>
  );
}
