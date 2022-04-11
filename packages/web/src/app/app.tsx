import Layout, { Content, Header } from 'antd/lib/layout/layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './auth/router-auth'
import ConnectPage from './pages/connect.page'
import QueuePage from './pages/queue.page'
import QueuesPage from './pages/queues.page'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <h2 style={{ color: '#ffffff'}}>SQS GUI</h2>
        </Header>
        <Content style={{ padding: '50px' }}>
          <Routes>
            <Route path="/connect" element={<ConnectPage/>} />
            <Route
              path="*"
              element={
                <RequireAuth>
                  <Routes>
                    <Route path="/queues" element={<QueuesPage/>} />
                    <Route path="/queues/:name" element={<QueuePage/>} />
                  </Routes>
                </RequireAuth>
              }
            />
        </Routes>
        </Content>
      </Layout>
      
    </BrowserRouter>
  )
}

export default App

