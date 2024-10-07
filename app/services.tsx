import { readFile } from 'fs/promises';
import { HeadlineMetadata, NewsArticle } from './models';


/**
 * Returns all country's name as string[]
 * @returns 
 */
export async function getCountryCodes(): Promise<string[]> {
    const dataFilePath = "data/country_codes.json"
    const jsonList = JSON.parse(await readFile(dataFilePath, {encoding: 'utf8'}))

    return new Promise(
        (resolve, reject) => {
            resolve(jsonList)
        }
    )
}
/**
 * Returns metadata of a country's headline
 * The type is HeadlineMetadata
 * @param countryCode 
 * @returns 
 */
export async function getHeadlineMetadata(countryCode:string): Promise<HeadlineMetadata> {
    const dataFilePath = "data/headline_metadata.json"
    const jsonData = JSON.parse(await readFile(dataFilePath, {encoding: 'utf8'}))

    const result:HeadlineMetadata = {
        countryCode: countryCode,
        countryName: jsonData[countryCode].country_name,
        lastUpdate: jsonData[countryCode].last_update
    }

    return new Promise(
        (resolve, reject) => {
            resolve(result)
        }
    )
}

/**
 * Returns list of NewsArticles from a country by `countryCode`
 * @param country_code 
 * @returns 
 */
export async function getNewsArticleList(countryCode:string): Promise<NewsArticle[]> {

    const dataFilePath = "data/"+countryCode+".csv"
    const dataList = ( await readFile(dataFilePath, { encoding: 'utf8' }) )
                        .split("\n")
                        .slice(1) // first row is explaination

    // country_code,url,title,description,image_url,publish_date,source
    
    let result: NewsArticle[] = []

    await Promise.all(dataList.map(
        async (val, idx, arr) => {
            let dataRow = val.split('\t')
            // dataRow: [country_code,url,title,description,image_url,publish_date,source]
            const item: NewsArticle = {
                    countryCode : dataRow[0],
                    url         : dataRow[1],
                    title       : dataRow[2],
                    description : dataRow[3],
                    imageUrl    : dataRow[4],
                    publishDate : dataRow[5],
                    source      : dataRow[6],
                }
            result.push(item)
        }
    ))

    return new Promise((resolve, reject)=>{
        resolve(result)
    })

}