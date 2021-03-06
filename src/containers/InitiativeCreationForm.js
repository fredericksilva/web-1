import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { fromUser } from 'store/selectors'
import { initiativeCreate } from 'store/actions'
import { createValidator, required, minLength, maxLength } from 'services/validation'

import { InitiativeCreationForm } from 'components'

const InitiativeCreationFormContainer = props => <InitiativeCreationForm {...props} />

const onSubmit = (data, dispatch) => new Promise((resolve, reject) => {
  dispatch(initiativeCreate.request(data, resolve, reject))
}).catch((error) => {
  if (error.status === 401) {
    throw new SubmissionError({ _error: 'Você precisa estar conectado para criar uma iniciativa' })
  }
  throw new SubmissionError({
    _error: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
  })
})

const validate = createValidator({
  title: [required, maxLength(120)],
  description: [required, minLength(60), maxLength(2048)]
})

const mapStateToProps = (state) => ({
  connected: !!fromUser.getCurrentDetail(state)
})

export default connect(mapStateToProps)(reduxForm({
  form: 'InitiativeCreationForm',
  onSubmit,
  validate
})(InitiativeCreationFormContainer))
