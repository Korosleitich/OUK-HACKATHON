import React from 'react'


export default function ThemeSwitcher(){
function setTheme(t){
document.documentElement.setAttribute('data-theme', t)
}
return (
<div className="theme-switcher">
<label>Theme:</label>
<select onChange={(e)=> setTheme(e.target.value)} defaultValue="light">
<option value="light">Light</option>
<option value="dark">Dark</option>
<option value="high-contrast">High Contrast</option>
</select>
</div>
)
}