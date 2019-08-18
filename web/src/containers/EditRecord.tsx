import React, { Fragment } from 'react'
import * as yup from 'yup'
import { FormikActions } from 'formik'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import FormikWrappper, { IFormData } from '../components/FormikWrappper/FormikWrappper'
import { ErrorService } from '../services/ErrorService'
import { RecordService } from '../services/RecordService'

interface IState {
  item: string | null
  owner: string | null
  price: string | null
}

interface IParams {
  recordId: string
}

interface IFormValues {
  item: string
  owner: string
  price: string
}

interface IProps {
  fetchRecords: () => void
}

class EditRecord extends React.Component<IProps & RouteComponentProps<IParams>, IState> {
  state: IState = {
    item: null,
    owner: null,
    price: null
  }

  componentDidMount() {
    const { state } = this.props.location
    if (!state) {
      return this.props.history.push('/records')
    }

    let stateToSet = {}
    if (state.item) {
      stateToSet = { ...stateToSet, item: state.item }
    }
    if (state.owner) {
      stateToSet = { ...stateToSet, owner: state.owner }
    }
    if (state.price) {
      stateToSet = { ...stateToSet, price: state.price }
    }
    this.setState(stateToSet)
  }

  handleSubmit = async (values: IFormValues, actions: FormikActions<IFormValues>) => {
    const { history } = this.props
    try {
      await RecordService.update(
        { item: values.item, owner: values.owner, price: values.price },
        this.props.match.params.recordId
      )
      await this.props.fetchRecords()

      history.push('/records')
    } catch (err) {
      ErrorService.parseServerError(err)
    }
    actions.setSubmitting(false)
  }

  handleDelete = async () => {
    const { history } = this.props
    try {
      await RecordService.delete(this.props.match.params.recordId)
      await this.props.fetchRecords()

      history.push('/records')
    } catch (err) {
      ErrorService.parseServerError(err)
    }
  }

  render() {
    if (!this.state.item || !this.state.owner || !this.state.price) return <div />
    const formDataCollection: IFormData<IFormValues>[] = [
      {
        key: 'item',
        type: 'text',
        placeholder: 'Item Name',
        initialValue: this.state.item || '',
        validation: yup
          .string()
          .label('Item Name')
          .required()
      },
      {
        key: 'owner',
        type: 'text',
        placeholder: 'Owner',
        initialValue: this.state.owner || '',
        validation: yup
          .string()
          .label('Owner')
          .required()
      },
      {
        key: 'price',
        type: 'string',
        placeholder: 'Price',
        initialValue: this.state.price || '',
        validation: yup
          .number()
          .label('Price')
          .required()
      }
    ]

    return (
      <Fragment>
        <FormikWrappper<IFormValues>
          formDataCollection={formDataCollection}
          handleSubmit={this.handleSubmit}
          buttonText={'Update'}
        />
        <button type='submit' className='btn btn-danger form-button mt-2' onClick={this.handleDelete}>
          {'Delete'}
        </button>
      </Fragment>
    )
  }
}

export default withRouter(EditRecord)
