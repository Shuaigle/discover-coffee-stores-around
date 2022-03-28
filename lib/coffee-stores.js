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

export const fetchCoffeeStores = async() => {
    //unsplashApi
    const photos = await unsplashApi.search.getPhotos({
        query: 'cat',
        page: 1,
        perPage: 10,
        color: 'green',
        orientation: 'portrait',
    })
    console.log('photos', photos)

    //foursquareApi
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `${process.env.FOURSQUARE_AUTHORIZATION}`
        }
    }
    
    const response = await fetch(
        getUrlForCoffeeStores("24.44,44.44", "coffee", 6),
        options
    )
    const data = await response.json()
    console.log(response)
    const unsplashResults = await photos.response.results
    console.log("results", unsplashResults)

    return data?.results?.map((venue, idx) => {
        const neighbourhood = venue.location.neighbourhood
        return {
            id: venue.fsq_id,
            address: venue.location.address || "",
            name:venue.name,
            neighbourhood: (neighbourhood && neighbourhood.length>0 && neighbourhood[0]) || venue.location.cross_street || "",
            // imgUrl: photos[idx],
        }
    })
}