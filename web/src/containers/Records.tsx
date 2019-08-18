import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import _ from 'lodash'
import { IRecordEntity } from '../services/RecordService'
import { apiPricesToDisplayString, apiDatesToDisplayString, apiPricesToFixed2 } from '../utils/Helpers'

interface IProps {
  records: IRecordEntity[]
}

class Records extends React.Component<IProps & RouteComponentProps> {
  handleRecordClick = (recordId: number, item: string, owner: string, price: string) => {
    this.props.history.push(`/records/edit/${recordId}`, { item, owner, price })
  }

  renderRecords() {
    return this.props.records.map((record, index) => {
      return (
        <tr
          key={index}
          onClick={() =>
            this.handleRecordClick(record.id, record.item, record.owner, apiPricesToFixed2(record.price))
          }
        >
          <td>{record.item}</td>
          <td>{apiPricesToDisplayString(record.price)}</td>
          <td>{record.owner}</td>
          <td>{apiDatesToDisplayString(record.createDate)}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div className='row text-center pt-3'>
        <div className='col-12'>
          <h1>Records</h1>
        </div>
        <div className='col-md-8 offset-md-2'>
          <div className='table-responsive'>
            <table className='table table-hover records-table'>
              <thead>
                <tr>
                  <th scope='col'>Item</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Owner</th>
                  <th scope='col'>Date Created</th>
                </tr>
              </thead>
              <tbody>{this.renderRecords()}</tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Records)
