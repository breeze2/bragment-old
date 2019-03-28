import Unsplash, { toJson } from 'unsplash-js'

const unsplash = new Unsplash({
    applicationId: '',
    secret: '',
})

function getRandomPhoto(count: number = 1) {
    return unsplash.photos.getRandomPhoto({
        count,
        height: 1080,
        query: 'desktop wallpapers',
        width: 1920,
    }).then(toJson).catch(err => {
        console.error(err)
        return []
    }).then(rst => {
        if (Array.isArray(rst)) {
            return rst
        }
        return []
    })
}

export default {
    getRandomPhoto,
}
