import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { InitiativeCard } from 'components'

const initiative = {
  title: 'Test title',
  tags: [{ id: 'tag1', name: 'tag1' }, { id: 'tag2', name: 'tag2' }],
  color: 'green',
  photo: {
    small: 'http://lorempixel.com/200/100'
  }
}

storiesOf('InitiativeCard', module)
  .add('default', () => (
    <InitiativeCard initiative={initiative} />
  ))
  .add('reverse', () => (
    <InitiativeCard initiative={initiative} reverse />
  ))
