import { Button, Card, Checkbox, Col, message, Modal, Row, Space } from "antd"
import { DeleteOutlined } from '@ant-design/icons';
import Form, { useForm } from "antd/lib/form/Form"
import FormItem from "antd/lib/form/FormItem"
import Input from "antd/lib/input/Input"
import { useCallback, useEffect, useState } from "react"
import { AwsConnect, useConnectMutation } from "../../api/api.generated";
import { Connection } from "../types";
import { currentConnectionVar } from "../state";
import { useNavigate } from "react-router-dom";

type FormValues = AwsConnect & { name?: string, remember: boolean}

const ConnectPage = () => {
  
  const navigate = useNavigate();
  const [remember, setRemember] = useState<boolean>(true);
  const [form] = useForm<FormValues>();
  const [connections, setConnections] = useState<Connection[]>([])

  useEffect(() => {
    const localStorageConnections : Connection[] = JSON.parse(localStorage.getItem('connections') || '[]');  
    setConnections(localStorageConnections);
  }, [])
  
  const [connect] = useConnectMutation();

  const onFormFinish = useCallback(async (values: FormValues) => {
    try {
      const { name, remember, ...aws } = values;
      const connectResponse = await connect({ variables: { aws }});
      const jwt = connectResponse.data?.connect;
      if(jwt){
        const newConnection = { name: name ?? 'unnamed', jwt };
        if(remember && name){
          const newConnections = [...connections, newConnection];
          setConnections(newConnections)
          localStorage.setItem('connections', JSON.stringify(newConnections))
        }
        setCurrentConnection(newConnection)
      }
    } catch(e){
      message.error(`Connection failed. (${(e as Error).message})`);
    }
  }, [connections, connect, localStorage])

  const onConnectionDeleteClick = useCallback((connection: Connection) => {
    Modal.confirm({
      title: <b>Are you sure?</b>,
      icon: null,
      content: 'Do you really want to delete this connection?',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: async () => {
        const newConnections = [...connections]
        newConnections.splice(connections.indexOf(connection, 0), 1)
        setConnections(newConnections)
        localStorage.setItem('connections', JSON.stringify(newConnections))
      },
    });
  }, [connections, localStorage])

  const setCurrentConnection = useCallback((connection: Connection) => {
    sessionStorage.setItem("currentConnection", JSON.stringify(connection))
    currentConnectionVar(connection)
    navigate('/queues')
  }, [currentConnectionVar, localStorage])

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center'}}>
      <div style={{ width: '100%', maxWidth: '1280px'}}>
        <Row gutter={[40, 40]}>
          <Col xs={24} xl={12}>
            <Card title="CONNECTIONS" style={{ width: '100%', height:'100%' }}>
              {
                connections.map(connection => (
                  <Row style={{ borderBottom: "1px solid #eee"}}>
                    <Col flex="auto"><Button type="link" onClick={() => setCurrentConnection(connection)}>{connection.name}</Button></Col>
                    <Col flex="50px" style={{ textAlign: "right" }}><Button type="link" onClick={() => onConnectionDeleteClick(connection)} >delete</Button></Col>
                  </Row>
                ))
              }
            </Card>
          </Col>
          <Col xs={24} xl={12}>
            <Card title="NEW CONNECTION" style={{ width: '100%', height:'100%' }}>
              <Form<FormValues>
                form={form}
                layout="vertical"
                scrollToFirstError
                initialValues={{
                  remember: true
                }}
                onFinish={onFormFinish}
                >
                <FormItem name="name" label="Connection Name" rules={[{ required: remember }]}>
                  <Input />
                </FormItem>
                <FormItem name={["credentials", "accessKeyId"]} label="AWS Access Key ID" rules={[{ required: true }]}>
                  <Input />
                </FormItem>
                <FormItem name={["credentials", "secretAccessKey"]} label="AWS Secret Access Key" rules={[{ required: true }]}>
                  <Input />
                </FormItem>
                <FormItem name="region" label="AWS Region" rules={[{ required: true }]}>
                  <Input />
                </FormItem>
                <FormItem name="endpoint" label="Custom Endpoint">
                  <Input />
                </FormItem>
                <FormItem name="remember" valuePropName="checked">
                  <Checkbox onChange={(e) => setRemember(e.target.checked)}>Save for later</Checkbox>
                </FormItem>
                <Space>
                  <Button type="primary" onClick={() => form.submit()}>Connect</Button>
                </Space>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ConnectPage
