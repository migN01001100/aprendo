import * as actions from './actionsVariables';

export const addWord = main => mainPrimary => mainSecondary => middle => middleSecondary => topLeft => topRight =>bottomLeft => bottomRight => ({
    type: actions.ADD_WORD,
    payload:{
        main,
        mainPrimary,
        mainSecondary,
        middle,
        middleSecondary,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    }
});
