import { SQS } from 'aws-sdk'
import { AwsConnect } from './graphql/types.generated'

export const createSQS = (aws?: AwsConnect): SQS => {
  if (!aws) throw new Error('Missing AWS credentials.')
  return new SQS({
    credentials: {
      accessKeyId: aws.credentials.accessKeyId,
      secretAccessKey: aws.credentials.secretAccessKey,
    },
    endpoint: aws.endpoint || undefined,
    region: aws.region,
  })
}

export const getNameFromURL = (URL: string) => {
  return URL.substring(URL.lastIndexOf('/') + 1, URL.length)
}

export const getNameFromARN = (ARN: string) => {
  return ARN.substring(ARN.lastIndexOf(':') + 1, ARN.length)
}
