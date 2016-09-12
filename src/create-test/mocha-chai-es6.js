export default function createMochaChaiES6Test ({actions, imports, reducer, equalityFunction}) {
  const its = actions.map((action, index) => {
    console.log(action.action.type)
    if (action.action.type === undefined) {
      return ''
    }
    return `it('${action.action.type} should correctly update state', function () {
  const action = actions[${index}]
  const result = reducer(action.prevState, action.action)
  expect(result).to.deep.equal(action.nextState)
})
`
  }).join('\n')
  return (`/* eslint-env mocha */

import { expect } from 'chai'

${imports}
${reducer}

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
