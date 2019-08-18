import { toast } from 'react-toastify'

export const ErrorService = {
  parseServerError: (err: any) => {
    console.error('Error Service', err)
    let parsedErr = err.message
    if (err.response && err.response.data && err.response.data.message) {
      parsedErr = err.response.data.message
    toast.error(parsedErr)
    }
    return parsedErr
  }
}
