import React from 'react'
import _ from 'lodash'
import { IRecordEntity } from '../services/RecordService'
import { apiPricesToDisplayString } from '../utils/Helpers'

interface IProps {
  records: IRecordEntity[]
}

class Iou extends React.Component<IProps> {
  renderRecords() {
    const results: any[] = []
    this.props.records.reduce((res: any, value) => {
      if (!res[value.owner]) {
        res[value.owner] = { owner: value.owner, total: 0 }
        results.push(res[value.owner])
      }
      res[value.owner].total += value.price
      return res
    }, {})

    return results.map((result, index) => {
      return (
        <tr key={index}>
          <td>{result.owner}</td>
          <td>{apiPricesToDisplayString(result.total)}</td>
          <td>{apiPricesToDisplayString(result.total / 6)}</td>
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
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Owner</th>
                  <th scope='col'>Total Spent</th>
                  <th scope='col'>Total IOU / person</th>
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

export default Iou
