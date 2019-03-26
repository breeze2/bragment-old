export const AppActionTypes = {
    SET_LANGUAGE: 'SET_LANGUAGE',
}

export const setLanguageAction = (key: string) => ({
    payload: { key },
    type: AppActionTypes.SET_LANGUAGE,
})
