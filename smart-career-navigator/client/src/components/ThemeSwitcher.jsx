import React from 'react'


export default function ThemeSwitcher({ theme, setTheme }){
return (
<div className="theme-switcher">
<label>Theme</label>
<select value={theme} onChange={e=>setTheme(e.target.value)}>
<option value="modern">Modern</option>
<option value="dark">Dark</option>
<option value="soft">Soft</option>
</select>
</div>
)
}