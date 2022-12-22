export interface floorList {
    id: string;
    name: string;
    keywords: string[];
    imgUrl: string;
    navList: NavList[];
    carouselList: CarouselList[];
    recommendList: string[];
    bigImg: string;
}

export interface NavList {
    url: string;
    text: string;
}

export interface CarouselList {
    id: string;
    imgUrl: string;
}
