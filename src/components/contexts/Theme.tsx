import { createContext,useState} from "react";

const ThemeContext=createContext<any>(null);
function ThemeContextWrapper({children}):any {

const [isDark,setisDark]=useState(false);

const toggleTheme=()=>{setisDark(!isDark)};
let values={isDark,setisDark,toggleTheme};


return <ThemeContext.Provider value={values}>
    {children}
</ThemeContext.Provider>


}

export {ThemeContextWrapper,ThemeContext};