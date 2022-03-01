const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

export const fetchCoffeeStores = async() => {
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

    return data.results
}