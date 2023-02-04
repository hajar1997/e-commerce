import Layout from "./components/layouts/Layout";
import Routing from "./components/layouts/Routing";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div className="App">
            <Routing/>
        </div>
      </Layout>
    </BrowserRouter>
)}

export default App;
