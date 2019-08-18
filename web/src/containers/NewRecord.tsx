import React from 'react'
import * as yup from 'yup'
import { FormikActions } from 'formik'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import FormikWrappper, { IFormData } from '../components/FormikWrappper/FormikWrappper'
import { AuthService } from '../services/AuthService'
import { ErrorService } from '../services/ErrorService'
import { RecordService } from '../services/RecordService'

interface IFormValues {
  item: string
  owner: string
  price: string
}

interface IProps {
  fetchRecords: () => void
}

class NewRecord extends React.Component<IProps & RouteComponentProps> {
  handleSubmit = async (values: IFormValues, actions: FormikActions<IFormValues>) => {
    const { history } = this.props
    try {
      await RecordService.create({ item: values.item, owner: values.owner, price: values.price })
      await this.props.fetchRecords()

      history.push('/records')
    } catch (err) {
      ErrorService.parseServerError(err)
    }
    actions.setSubmitting(false)
  }

  render() {
    const formDataCollection: IFormData<IFormValues>[] = [
      {
        key: 'item',
        type: 'text',
        placeholder: 'Item Name',
        initialValue: '',
        validation: yup
          .string()
          .label('Item Name')
          .required()
      },
      {
        key: 'owner',
        type: 'text',
        placeholder: 'Owner',
        initialValue: '',
        validation: yup
          .string()
          .label('Owner')
          .required()
      },
      {
        key: 'price',
        type: 'string',
        placeholder: 'Price',
        initialValue: '',
        validation: yup
          .number()
          .label('Price')
          .required()
      }
    ]

    return (
      <FormikWrappper<IFormValues>
        formDataCollection={formDataCollection}
        handleSubmit={this.handleSubmit}
        buttonText={'Create'}
      />
    )
  }
}

export default withRouter(NewRecord)
