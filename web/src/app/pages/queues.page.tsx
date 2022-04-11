import { useReactiveVar } from "@apollo/client";
import { Button, Card, List } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueuesQuery } from "../../api/api.generated";
import { currentConnectionVar } from "../state";

const QueuesPage = () => {

  const navigate = useNavigate()

  const queuesResponse = useQueuesQuery();
  const currentConnection = useReactiveVar(currentConnectionVar);

  const onBackClick = useCallback(() => {
    sessionStorage.removeItem('currentConnection')
    currentConnectionVar(undefined);
  }, [currentConnectionVar, sessionStorage])

  const onQueueClick = useCallback((queue) => {
    navigate(`/queues/${getNameFromURL(queue.URL)}`)
  }, [currentConnectionVar, sessionStorage])

  return (
    <Card 
      title={`${currentConnection?.name !== 'unnamed' ? `${currentConnection?.name} - ` : ''}QUEUES`}
      extra={<Button type="link" onClick={onBackClick}>disconnect</Button>}
    >
      <List 
        loading={queuesResponse.loading}
        itemLayout="horizontal"
        dataSource={queuesResponse.data?.queues || []}
        bordered
        renderItem={queue => (
          <List.Item key={queue.ARN}>
            <List.Item.Meta title="Queue name" description={<Button style={{ padding: '0px'}} type="link" onClick={() => onQueueClick(queue)}>{getNameFromURL(queue.URL)}</Button>} />
            <List.Item.Meta title="URL" description={queue.URL} />
            <List.Item.Meta title="AWS ARN" description={queue.ARN} />
            <List.Item.Meta title="Number of messages" description={queue.count} />
          </List.Item>
        )}
      />
    </Card>
  )
}

export const getNameFromURL = (URL: string) => {
  return URL.substring(URL.lastIndexOf('/') + 1, URL.length)
}

export default QueuesPage
