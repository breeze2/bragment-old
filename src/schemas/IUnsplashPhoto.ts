interface IUnsplashPhotoLinks {
    download: string
}

interface IUnsplashPhotoUrls {
    full: string
    small: string
    thumb: string
}

export default interface IUnsplashPhoto {
    id: string
    color: string
    links: IUnsplashPhotoLinks
    urls: IUnsplashPhotoUrls
}