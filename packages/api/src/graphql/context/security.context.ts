import jwt from 'jsonwebtoken'
import { AwsConnect } from '../types.generated'

export const validateToken = (jwtToken: string): AwsConnect => {
  try {
    const decodedJwtToken = <AwsConnect>jwt.verify(jwtToken, process.env.TOKEN_SECRET || '')
    if (decodedJwtToken) {
      return decodedJwtToken
    } else {
      throw new Error('Invalid JWT token.')
    }
  } catch (e) {
    throw new Error('Invalid JWT token.')
  }
}
