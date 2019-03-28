interface IUnsplashPhotoLinks {
    download: string
}

interface IUnsplashPhotoUrls {
    small: string
    full: string
}

export default interface IUnsplashPhoto {
    id: string
    color: string
    links: IUnsplashPhotoLinks
    urls: IUnsplashPhotoUrls
}