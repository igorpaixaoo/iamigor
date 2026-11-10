import './styles/AppStyle.css';
import './styles/GlobalStyle.css'

import NavBar from './components/NavBar'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Home from './components/sections/Home'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <main>
        <Home/>
        <Projects/>
        <Contact/>
      </main>
    </div>
  );
}

export default App;
