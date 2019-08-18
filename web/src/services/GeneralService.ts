import axios from 'axios'

export const GeneralService = {
  async getLatLngFromIp() {
    const { data } = await axios.get('http://ip-api.com/json/')
    return data
  }
}
