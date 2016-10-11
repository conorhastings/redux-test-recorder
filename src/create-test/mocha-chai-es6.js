export default function createMochaChaiES6Test ({actions, imports, reducer, equalityFunction}) {
  const its = actions.map((action, index) => {
    if (action.action.type === undefined) {
      return ''
    }
    return `it('${action.action.type} should correctly update state', function () {
  const action = actions[${index}]
  const result = reducer(action.prevState, action.action)
  const cleanedResult = JSON.parse(JSON.stringify(result))
  expect(equality(cleanedResult, action.nextState)).to.be.true
})
`
  }).join('\n')
  return (`/* eslint-env mocha */

import { expect } from 'chai'
import _ from 'lodash'

${imports}
${reducer}

const equality = ${equalityFunction}

describe('redux reducer test', function () {
  let actions

  before(() => {
    actions = ${JSON.stringify(actions, null, 2)}
  })

  after(() => {
    actions = []
  })

${its}

})`.replace(/\"/g, '\''))
}
