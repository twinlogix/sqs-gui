import { Form, message, Modal, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import { useCallback, useEffect, useState } from 'react';
import { QueueMessage, useSendMessageMutation } from '../../api/api.generated';

function NewMessageModal(props: { url: string, visible?: boolean; onClose: (message?: QueueMessage) => void }) {
  
  const { url, visible, onClose } = props;
  const [type, setType] = useState<'json' | 'raw'>('json');
  const [content, setContent] = useState<string>('');
  const [jsonContent, setJsonContent] = useState<string | undefined>();

  const [sendMessage] = useSendMessageMutation()
  
  useEffect(() => {
    setType('json')
    setContent('')
    setJsonContent(undefined)
  }, [visible])

  const onCancelClick = useCallback(() => {
    onClose();
  }, [])

  const onOkClick = useCallback(async () => {
    try {
      const response = await sendMessage({ variables: { url, body: content }})
      onClose({ id: response.data!.sendMessage.id, body: content });
    } catch(e) {
      message.error(`Message creation failed. (${(e as Error).message})`);
    }
  }, [content])

  const onContentChange = useCallback(async (value) => {
    if(type === 'json'){
      try {
        setJsonContent(JSON.stringify(JSON.parse(value), undefined, 2))
      } catch(e) {
        setJsonContent(undefined)
      }
    }
    setContent(value)
  }, [content])

  return (
    <Modal 
      title="New Message" 
      visible={visible} 
      onCancel={onCancelClick} 
      onOk={onOkClick} 
      okText="Send"
      okButtonProps={{ disabled: !content || (type=== 'json' && !jsonContent) }}
      >
      <Form layout="vertical" >
        <FormItem label="Content Type">
          <Select value={type} onChange={value => setType(value)}>
            <Select.Option key={'json'}>json</Select.Option>
            <Select.Option key={'raw'}>raw</Select.Option>
          </Select>
        </FormItem>
        <FormItem label="Message content">
          <TextArea value={content} onChange={e => onContentChange(e.target.value)} rows={6} />
        </FormItem>
      </Form>
    </Modal>
  );
}

export default NewMessageModal;