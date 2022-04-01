//unsplash.js
import { createApi } from 'unsplash-js';

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
    //unsplashApi
    const photos = await unsplashApi.search.getPhotos({
        query: 'coffee',
        perPage: 10,
    })
    // console.log('photos', photos)
    const unsplashResults = photos.response.results
    // console.log('results', unsplashResults)
    return unsplashResults.map((result) => result.urls['small'])
    // console.log('response', photoresponse)
}

export const fetchCoffeeStores = async () => {
    const photos = await getListOfCoffeeStorePhotos()
    //foursquareApi
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `${process.env.FOURSQUARE_AUTHORIZATION}`
        }
    }
    
    const response = await fetch(
        getUrlForCoffeeStores("24.44,55.33", "coffee", 6),
        options
    )
    const data = await response.json()
    // console.log(response)
    
    return data?.results?.map((venue, idx) => {
        const neighbourhood = venue.location.neighbourhood
        return {
            id: venue.fsq_id,
            address: venue.location.formatted_address || "",
            name:venue.name,
            neighbourhood: 
                (neighbourhood && neighbourhood.length>0 && 
                neighbourhood[0]) || venue.location.cross_street || "",
            imgUrl: photos[idx],
        }
    })
}