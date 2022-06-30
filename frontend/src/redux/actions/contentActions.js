import ContentService from "../../services/contentService";

export function getContents() {
    // when the backend call was successfull and the movies are retrieved
    // in the dispatcher the movies will be added to the global state
    function onSuccess(contents) {
        return { type: "GETCONTENTS_SUCCESS", contents: contents };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log("failed to get all content", error);
    }

    return async (dispatch) => {
        try {
            // ask for the movies in the backend
            let contents = await ContentService.getContents();
            // call onSuccess in context of redux
            dispatch(onSuccess(contents));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function addContent(content) {
    function onSuccess() {
        return { type: "ADDCONTENT_SUCCESS" };
    }
    function onFailure(error) {
        console.log("add content failure", error);
    }

    return async (dispatch) => {
        try {
            await ContentService.createContent(content);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}
