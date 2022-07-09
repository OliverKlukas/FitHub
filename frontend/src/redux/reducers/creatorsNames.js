export default function creatorsNames(state = {}, action) {
    switch (action.type) {
        case "GETCREATORS_LIST":
            return { creatorsNames: action.creatorsNames };
        default:
            return state;
    }
}
