import * as actions from './actionsVariables';

export const addWord = main => translation => mainPrimary => mainSecondary => middle => middleSecondary => topLeft => topRight =>bottomLeft => bottomRight => ({
    type: actions.ADD_WORD,
    payload:{
        main,
        translation,
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
