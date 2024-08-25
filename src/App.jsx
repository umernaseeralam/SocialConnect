import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Signin } from '../Pages/Signin';
import {Signup} from '../Pages/Sign-up';
import {Feed} from '../Pages/Feed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin/>} />
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Feed" element={<Feed/>}/>

      </Routes>
    </Router>
  );
}

export default App;
