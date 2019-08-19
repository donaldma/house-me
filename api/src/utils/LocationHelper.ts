// @ts-ignore
import GeocodeParser from 'google-geocode-parser'
import axios from 'axios'

export default {
  async getLocationDataFromLatLng(lat: string, lng: string) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_KEY}`
    )
    const data = response.data
    console.log('data', data)
    if (data) {
      const parsed = new GeocodeParser(data)
      return parsed
    }
    return
  }
}
