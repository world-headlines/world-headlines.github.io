/**
 * Represents News from a Headline
 */
export type NewsArticle =  {
    countryCode: string,
    url: string,
    title: string,
    description:string,
    imageUrl:string,
    publishDate:string,
    source:string,
}

/**
 * Represents metadata of headline of a country
 */
export type HeadlineMetadata = {
    countryCode: string,
    countryName: string,
    lastUpdate: string
}
