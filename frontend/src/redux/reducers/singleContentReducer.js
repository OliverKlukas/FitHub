export default function singleContent(state = {}, action) {
    switch (action.type) {
        case "GETCONTENT_SUCCESS":
            return { content: action.content };
        case "GETCONTENT_ERROR":
            return { error: action.error };
        case "CHANGE_SELECTED_CONTENT":
            return {
                content: {
                    ...state.content,
                    ...action.updates,
                },
            };
        default:
            return { content: action.content };
    }
}
