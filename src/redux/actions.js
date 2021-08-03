import * as actions from './actionsVariables';

export const addWord = main => mainSecondary => middle => middleSecondary => topLeft => topRight =>bottomLeft => bottomRight => ({
    type: actions.ADD_WORD,
    payload:{
        main,
        mainSecondary,
        middle,
        middleSecondary,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    }
});
