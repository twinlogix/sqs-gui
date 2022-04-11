import { makeVar } from '@apollo/client'
import { Queue } from '../api/api.generated'
import { Connection } from './types'

const sessionStorageCurrentConnection = sessionStorage.getItem('currentConnection')
const currentConnection = sessionStorageCurrentConnection ? JSON.parse(sessionStorageCurrentConnection) : undefined
export const currentConnectionVar = makeVar<Connection | undefined>(currentConnection)