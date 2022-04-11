import { gql } from '@apollo/client'

export const operations = gql`
  query Queues {
    queues {
      URL
      ARN
      count
    }
  }

  query Queue($name: String!) {
    queue(name: $name) {
      URL
      ARN
      count
    }
  }

  query QueueMessages($url: String!) {
    queueMessages(URL: $url) {
      id
      body
    }
  }

  mutation Connect($aws: AwsConnect!) {
    connect(aws: $aws)
  }

  mutation SendMessage($url: String!, $body: String!) {
    sendMessage(URL: $url, body: $body) {
      id
    }
  }
`
