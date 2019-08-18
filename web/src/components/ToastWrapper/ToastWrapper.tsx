import './ToastWrapper.scss'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastWrapper: React.FC = (props) => <ToastContainer position='top-right' autoClose={3000} />

export default ToastWrapper
