import Image from "next/image";
import styles from "./page.module.css";
import getGlobalData from "./app.data";
import { GlobalData } from "./models";
import { ReactNode } from "react";

function getCountryDescElement(countryCode:string, countryName:string):ReactNode {

  let flag_src = "/flags/"+countryCode+".svg"
  let flag_alt = "link for "+countryName+"'s headline"
  return (
    <div className="country-desc" key={"desc-element-"+countryCode}>
      <a href={"/"+countryCode}>
        <Image src={flag_src} alt={flag_alt} width={180} height={135}/>
        <p>Click to catch up latest headline news from {countryName}</p>
      </a>
    </div>
  )
}

export default async function Home() {
  let globalData: GlobalData = await getGlobalData()
  let countryDescElements: ReactNode[] = []
  
  await Promise.all(globalData.countryCodes.map(async (val, idx, arr)=>{
    let code = val
    let country = globalData.headlineMap.get(code)?.country
    
    if(country == undefined)
      country = ''

    countryDescElements.push(
      getCountryDescElement(code, country)
    )
  }))

  let desc_str = "World Headlines delivers the latest global news directly. With the translation service, you can explore headlines from various countries without any language barriers."
  return new Promise((resolve, reject)=>{
    
    resolve(
      <>
        <main className="main-desc">
          <img src={"/icon.jpg"} alt="world-headlines icon" width={180} height={180}/>
          <p>{desc_str}</p>
        </main>
        <section className="country-desc-container">
          {countryDescElements}
        </section>
      </>
    )
  });
}
