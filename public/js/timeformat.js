/**
 * Changes timeformat to fit to user's browser
 */

function changeToBrowserTime(utcTime){
    // utcTime: "YYYY-MM-DD HH:mm:ss"
    const year = parseInt(utcTime.substr(0, 4))
    const monthIdx = parseInt(utcTime.substr(5, 2))
    const day = parseInt(utcTime.substr(8, 2))
    const hour = parseInt(utcTime.substr(11, 2))
    const mins = parseInt(utcTime.substr(14, 2))
    const sec = parseInt(utcTime.substr(17, 2))

    
    const timeoffsetMinutes = new Date().getTimezoneOffset()

    return new Date(year, monthIdx, day, hour, mins + timeoffsetMinutes, sec)
}

// #last-update-headline
// .article-publish-date

function modifyTimeElements(){

    const headlineTime = document.getElementById("last-update-headline")
    if(headlineTime != null)
        headlineTime.innerHTML = changeToBrowserTime(headlineTime.innerHTML).toString()
    
    const articleTimes = document.getElementsByClassName("article-publish-date")
    if(articleTimes != null)
        for(let idx = 0; idx < articleTimes.length; idx++){
            const element = articleTimes[idx]

            element.innerHTML = changeToBrowserTime(element.innerHTML).toString()
        }
}

modifyTimeElements()