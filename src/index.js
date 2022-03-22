const containerEl = document.querySelector('#container')
const API_ENDPOINT =
  'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B5282D9D-8FDD-40E9-AD48-B1DF3270465D'

const getWeatherData = async () => {
  try {
    const response = await fetch(API_ENDPOINT)
    const data = await response.json()
    const location = data?.records?.location ?? []
    location.forEach((city) => {
      const { locationName, weatherElement } = city ?? {}
      const [wx, pop, mint, ci, maxt] = weatherElement ?? []
      const report = wx?.time?.[0]?.parameter?.parameterName ?? 'Unknown'
      const chanceOfRain = parseInt(pop?.time?.[0]?.parameter?.parameterName ?? 0, 10)
      const hightTemp = mint?.time?.[0]?.parameter?.parameterName ?? 'Unknown'
      const feels = ci?.time?.[0]?.parameter?.parameterName ?? 'Unknown'
      const lowTemp = maxt?.time?.[0]?.parameter?.parameterName ?? 'Unknown'

      let weatherImg = 'sun.jpg'
      let cardColor = '#7AA4A6'
      if (chanceOfRain <= 30) {
        weatherImg = 'sun.jpg'
        cardColor = '#7AA4A6'
      } else if (chanceOfRain <= 60) {
        weatherImg = 'cloudy.jpg'
        cardColor = '#4E6A79'
      } else {
        weatherImg = 'rain.jpg'
        cardColor = '#2C4357'
      }

      container.innerHTML += `
      <div class="card" style="background-color: ${cardColor}">
          <div class="city">
              <p>${locationName}</p>
          </div>
          <div class="show" style="background-image: url('./img/${weatherImg}')")></div>
          <div class="bot">
              <div class="bot-right">
                  <div class="right weather">
                      <p>天氣狀況<br>${report}</p>
                  </div>
                  <div class="right feel">
                      <p>體感：${feels}</p>
                  </div>
              </div>
              <div class="celsius">
                  <p>溫度<br>${hightTemp}<br>|<br>${lowTemp}</p>
              </div>
          </div>
      </div>
      `
    })
  } catch (error) {
    container.innerHTML = 'API Error'
    console.error('Failed to fetch weather API', error)
  }
}

getWeatherData()

// var container = document.querySelector('#container')
// fetch(
//   'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B5282D9D-8FDD-40E9-AD48-B1DF3270465D'
// )
//   .then(function (response) {
//     return response.json()
//   })
//   .then(function (weather) {
//     console.log(weather.records.location[11].locationName)
//     let location = weather.records.location
//     for (let index = 0; index < location.length; index++) {
//       var place = location[index].locationName
//       var report =
//         location[index].weatherElement[0].time[0].parameter.parameterName
//       var hightTemp =
//         location[index].weatherElement[2].time[0].parameter.parameterName
//       var lowTemp =
//         location[index].weatherElement[4].time[0].parameter.parameterName
//       var feels =
//         location[index].weatherElement[3].time[0].parameter.parameterName

//       if (
//         location[index].weatherElement[1].time[0].parameter.parameterName <= 30
//       ) {
//         var weatherImg = 'sun.jpg'
//         var cardColor = '#7AA4A6'
//       } else if (
//         location[index].weatherElement[1].time[0].parameter.parameterName <= 60
//       ) {
//         var weatherImg = 'cloudy.jpg'
//         var cardColor = '#4E6A79'
//       } else {
//         var weatherImg = 'rain.jpg'
//         var cardColor = '#2C4357'
//       }

//       container.innerHTML += `

//             <div class="card" style="background-color: ${cardColor}">
//                 <div class="city">
//                     <p>${place}</p>
//                 </div>
//                 <div class="show" style="background-image: url('./img/${weatherImg}')")></div>
//                 <div class="bot">
//                     <div class="bot-right">
//                         <div class="right weather">
//                             <p>天氣狀況<br>${report}</p>
//                         </div>
//                         <div class="right feel">
//                             <p>體感：${feels}</p>
//                         </div>
//                     </div>
//                     <div class="celsius">
//                         <p>溫度<br>${hightTemp}<br>|<br>${lowTemp}</p>
//                     </div>
//                 </div>
//             </div>    
//             `
//     }
//   })
