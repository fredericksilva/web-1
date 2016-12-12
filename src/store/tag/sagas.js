import { arrayOf, normalize } from 'normalizr'
import { take, put, call, fork } from 'redux-saga/effects'
import {
  tagCreate,
  tagListRead,
  TAG_CREATE_REQUEST,
  TAG_LIST_READ_REQUEST
} from './actions'
import tag from './schema'
import api from 'services/api'

// istanbul ignore next
const noop = () => {}

export function* createTag (newData, resolve = noop, reject = noop) {
  try {
    const { data } = yield call(api.post, '/tags', newData)
    yield put(tagCreate.success(normalize(data, tag)))
    resolve(data)
  } catch (error) {
    yield put(tagCreate.failure(error.data))
    reject(error)
  }
}

export function* readTagList (params, resolve = noop, reject = noop) {
  try {
    const { data } = yield call(api.get, '/tags', { params })
    yield put(tagListRead.success(normalize(data, arrayOf(tag))))
    resolve(data)
  } catch (error) {
    yield put(tagListRead.failure(error.data))
    reject(error)
  }
}

export function* watchTagCreateRequest () {
  while (true) {
    const { data, resolve, reject } = yield take(TAG_CREATE_REQUEST)
    yield call(createTag, data, resolve, reject)
  }
}

export function* watchTagListReadRequest () {
  while (true) {
    const { params, resolve, reject } = yield take(TAG_LIST_READ_REQUEST)
    yield call(readTagList, params, resolve, reject)
  }
}

export default function* () {
  yield fork(watchTagCreateRequest)
  yield fork(watchTagListReadRequest)
}
