import './FormikWrapper.scss'
import React from 'react'
import { FormikProps, Form, Field, FormikActions, Formik } from 'formik'
import * as yup from 'yup'
// @ts-ignore
import classNames from 'classnames'

interface IProps<T> {
  formDataCollection: IFormData<T>[]
  handleSubmit: (values: T, formikActions: FormikActions<T>) => void
  buttonText?: string
}

export interface IFormData<T> {
  key: keyof T
  type: string
  placeholder?: string
  initialValue: any
  validation: yup.Schema<any>
}

class FormikWrappper<T> extends React.Component<IProps<T>> {
  formDataCollectionReduceHelper = (key: keyof IFormData<T>) => {
    return this.props.formDataCollection.reduce((obj: any, formData) => {
      obj[formData.key] = formData[key]
      return obj
    }, {})
  }

  renderForm = (props: FormikProps<T>) => {
    const { touched, errors, isSubmitting } = props
    return (
      <Form>
        <div className=''>
          {this.props.formDataCollection.map((formData, index) => {
            const isTouched = touched[formData.key]
            const hasErrors = errors[formData.key]

            return (
              <div
                className={classNames('form-field-container', {
                  'mb-0': isTouched && hasErrors
                })}
                key={index}
              >
                <Field
                  type={formData.type}
                  name={formData.key}
                  className={classNames('form-field', {
                    'error-field': isTouched && hasErrors
                  })}
                  placeholder={formData.placeholder || ''}
                />
                {isTouched && hasErrors && <div className='error-text'>{errors[formData.key]}</div>}
              </div>
            )
          })}
        </div>

        <button type='submit' disabled={isSubmitting} className='btn btn-primary form-button'>
          {this.props.buttonText || 'Submit'}
        </button>
      </Form>
    )
  }

  render() {
    const { handleSubmit } = this.props
    const initialValues = this.formDataCollectionReduceHelper('initialValue')
    const validations = this.formDataCollectionReduceHelper('validation')
    const validationSchema = yup.object().shape(validations)

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        render={this.renderForm}
      />
    )
  }
}

export default FormikWrappper
