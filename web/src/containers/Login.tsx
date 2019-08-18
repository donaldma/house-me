import React from 'react'
import * as yup from 'yup'
import { FormikActions } from 'formik'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import FormikWrappper, { IFormData } from '../components/FormikWrappper/FormikWrappper'
import { AuthService } from '../services/AuthService'
import { ErrorService } from '../services/ErrorService'

interface IFormValues {
  email: string
  password: string
}

interface IProps {
  setAuthenticationStatus: (isAuthenticated: boolean) => void
}

class Login extends React.Component<IProps & RouteComponentProps> {
  handleSubmit = async (values: IFormValues, actions: FormikActions<IFormValues>) => {
    const { setAuthenticationStatus, history } = this.props
    try {
      await AuthService.login(values.email, values.password)
      setAuthenticationStatus(true)

      history.push('/')
    } catch (err) {
      ErrorService.parseServerError(err)
    }
    actions.setSubmitting(false)
  }

  render() {
    const formDataCollection: IFormData<IFormValues>[] = [
      {
        key: 'email',
        type: 'email',
        placeholder: 'Email',
        initialValue: '',
        validation: yup
          .string()
          .label('Email')
          .email()
          .required()
      },
      {
        key: 'password',
        type: 'password',
        placeholder: 'Password',
        initialValue: '',
        validation: yup
          .string()
          .label('Password')
          .required()
      }
    ]

    return (
      <FormikWrappper<IFormValues>
        formDataCollection={formDataCollection}
        handleSubmit={this.handleSubmit}
        buttonText={'Log In'}
      />
    )
  }
}

export default withRouter(Login)
