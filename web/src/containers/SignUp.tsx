import React from 'react'
import * as yup from 'yup'
import { FormikActions } from 'formik'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import FormikWrappper, { IFormData } from '../components/FormikWrappper/FormikWrappper'
import { AuthService } from '../services/AuthService'
import { ErrorService } from '../services/ErrorService'

interface IFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}

interface IProps {
  setAuthenticationStatus: (isAuthenticated: boolean) => void
}

class SignUp extends React.Component<IProps & RouteComponentProps> {
  handleSubmit = async (values: IFormValues, actions: FormikActions<IFormValues>) => {
    const { setAuthenticationStatus, history } = this.props
    try {
      await AuthService.register(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        values.phone
      )
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
        key: 'firstName',
        type: 'text',
        placeholder: 'First Name',
        initialValue: '',
        validation: yup
          .string()
          .label('First Name')
          .required()
      },
      {
        key: 'lastName',
        type: 'text',
        placeholder: 'Last Name',
        initialValue: '',
        validation: yup
          .string()
          .label('Last Name')
          .required()
      },
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
          .min(8)
      },
      {
        key: 'phone',
        type: 'phone',
        placeholder: 'Phone number',
        initialValue: '',
        validation: yup
          .string()
          .label('Phone number')
          .min(10)
      }
    ]

    return (
      <FormikWrappper<IFormValues>
        formDataCollection={formDataCollection}
        handleSubmit={this.handleSubmit}
        buttonText={'Sign Up'}
      />
    )
  }
}

export default withRouter(SignUp)
