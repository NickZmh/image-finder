import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import 'cross-fetch/polyfill'
import dotenv from 'dotenv'

import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

dotenv.config({ path: '.env.test' })
