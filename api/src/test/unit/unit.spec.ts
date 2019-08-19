import { isUpdateRequired } from '../../models/Validation'
import { expect } from 'chai'

describe('Unit tests', () => {
  it('isUpdateRequired validates request objects correctly', (done) => {
    const updateIsRequired: any = {
      a: 'a',
      b: undefined
    }
    const updateIsNotRequired: any = {
      a: undefined,
      b: undefined
    }
    expect(isUpdateRequired(updateIsRequired)).true
    expect(isUpdateRequired(updateIsNotRequired)).false
    done()
  })
})
