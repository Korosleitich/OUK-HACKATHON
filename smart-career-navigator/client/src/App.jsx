import React, {useState} from 'react'
import Dashboard from './components/Dashboard'
import ThemeSwitcher from './components/ThemeSwitcher'


export default function App(){
const [theme, setTheme] = useState('modern')
return (
<div className={`app theme-${theme}`}>
<div className="topbar">
<h1>Smart Career Navigator</h1>
<ThemeSwitcher theme={theme} setTheme={setTheme} />
</div>
<Dashboard />
</div>
)
}