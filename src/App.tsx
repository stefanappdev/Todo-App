
import './styles/App.css'
import{useContext} from "react";
import { ThemeContextWrapper} from './components/contexts/Theme';
import List from "./components/List";

function App() {
 

  return (

    <ThemeContextWrapper >

      
        <div id="app">
        
        <List/>

        
        </div>
    </ThemeContextWrapper>
  )
}

export default App
