require("dotenv").config({path: '../.env'});
const axios = require('axios')

exports.getVendors = async () => {
    const endpoint = 'https://www.bungie.net/Platform'
    const headers = {
        'X-API-Key': process.env.BUNGIE_API_KEY,
        'Content-Type': 'application/json'
    }

    const res = await axios({
        url: `${endpoint}/Destiny2/Vendors?components=402&definitions=true`,
        method: 'get',
        headers: headers
    })
    const data = await res
    return data.data.Response.sales.data
}

exports.getItemInformation = async (itemHash) => {
    const endpoint = 'https://www.bungie.net/Platform'
    const headers = {
        'X-API-Key': process.env.BUNGIE_API_KEY,
        'Content-Type': 'application/json'
    }

    const res = await axios({
        url: `${endpoint}/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`,
        method: 'get',
        headers: headers
    })
    const data = await res
    return data.data.Response
}

exports.getVendorInformation = async (vendorHash) => {
    const endpoint = 'https://www.bungie.net/Platform'
    const headers = {
        'X-API-Key': process.env.BUNGIE_API_KEY,
        'Content-Type': 'application/json'
    }

    const res = await axios({
        url: `${endpoint}/Destiny2/Manifest/DestinyVendorDefinition/${vendorHash}/`,
        method: 'get',
        headers: headers
    })
    const data = await res
    return data.data.Response.displayProperties
}

exports.getTraitInformation = async (traitHash) => {
    const endpoint = 'https://www.bungie.net/Platform'
    const headers = {
        'X-API-Key': process.env.BUNGIE_API_KEY,
        'Content-Type': 'application/json'
    }

    const res = await axios({
        url: `${endpoint}/Destiny2/Manifest/DestinyPerkReference/${traitHash}/`,
        method: 'get',
        headers: headers
    })
    const data = await res
    return data.data.Response
}