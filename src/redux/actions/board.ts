export const BoardActionTypes = {
    ASYNC_FETCH_STANDBY_BG_IMAGES: 'ASYNC_FETCH_STANDBY_BG_IMAGES',
    SET_STANDBY_BG_IMAGES: 'SET_STANDBY_BG_IMAGES',
}

export const setStandbyBgImages = (images: any[]) => ({
    payload: { images },
    type: BoardActionTypes.SET_STANDBY_BG_IMAGES,
})

export const asyncFetchStandbyBgImages = () => ({
    payload: null,
    type: BoardActionTypes.ASYNC_FETCH_STANDBY_BG_IMAGES,
})
