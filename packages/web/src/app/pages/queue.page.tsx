import { Button, Card, List, Typography } from "antd";
import { useCallback, useState } from "react";
import ReactJson from "react-json-view";
import { useNavigate, useParams } from "react-router-dom";
import { useQueueMessagesQuery, useQueueQuery } from "../../api/api.generated";
import NewMessageModal from "./new-message.modal";
import { getNameFromURL } from "./queues.page";

const QueuePage = () => {
  
  const navigate = useNavigate()
  const { name } = useParams<{ name: string }>();
  if(!name)
    return null;

  const [newMessageModalVisible, setNewMessageModalVisible] = useState<boolean>();

  const queueResponse = useQueueQuery({ variables: { name }})
  const queue = queueResponse.data?.queue;

  const messagesResponse = useQueueMessagesQuery({
    variables: { url: queue?.URL ?? '' },
    skip: !queue?.URL,
    pollInterval: 10*1000
  });

  const onBackClick = useCallback(() => {
    navigate(`/queues`)
  }, [])

  const onNewMessageModalClose = useCallback((newMessage) => {
    setNewMessageModalVisible(false)
    if(newMessage) messagesResponse.refetch()
  }, [])
  
  return (
    <>
      <Card 
        title={queue ? `${getNameFromURL(queue?.URL)} Messages` : 'Loading...'}
        extra={<Button type="link" onClick={onBackClick}>back</Button>}
        >
          <div><Button type="primary" onClick={() => setNewMessageModalVisible(true)}>New Message</Button></div>
          <div style={{ textAlign: 'right', width: '100%' }}>
            <Typography.Text type="secondary" style={{ fontSize: '10px'}}>Only the first 10 messages are shown due to SQS limits. Message list automatically refresh every 10 seconds.</Typography.Text>
          </div>
          <List loading={messagesResponse.loading} itemLayout="vertical" bordered>
            {(messagesResponse.data?.queueMessages || []).map(message => {
              let jsonContent;
              try { 
                jsonContent = JSON.parse(message.body)
              } catch(e){
                jsonContent = undefined
              }
              return (
                <List.Item key={message.id}>
                  <List.Item.Meta title="Message ID" description={message.id} />
                  <List.Item.Meta 
                    title="Content" 
                    description={
                      jsonContent ? <ReactJson name={false} displayDataTypes={false} displayObjectSize={false}  src={jsonContent} /> : message.body
                    } 
                    />
                </List.Item>
              )}
            )}
            
          </List>
          
      </Card>
      { queue && <NewMessageModal url={queue?.URL} visible={newMessageModalVisible} onClose={onNewMessageModalClose}/> }
    </>
  )
}

export default QueuePage
