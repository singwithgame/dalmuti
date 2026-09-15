const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

const checkboxRegex = /<input type="checkbox" checked=\{autoPassTrick\} onChange=\{\(e\) => setAutoPassTrick\(e\.target\.checked\)\} style=\{\{ transform: 'scale\(1\.2\)' \}\} \/>/g;
const toggleHtml = \`<div className={\\\`toggle-switch \${autoPassTrick ? 'active' : ''}\\\`} onClick={() => setAutoPassTrick(!autoPassTrick)}>
                      <div className="toggle-knob"></div>
                    </div>\`;

code = code.replace(checkboxRegex, toggleHtml);

// Remove the input wrapper logic if it causes issues, but we just replaced the <input>.
// Wait, the label has an onClick from the input normally, but since we replaced the input with a div that has onClick, clicking the label might not trigger anything because there's no native input to proxy the click to.
// Let's remove the <label> and make it a <div> so clicking the text also toggles.
code = code.replace(
  /<label style=\{\{ color: 'var\(--text-secondary\)', fontSize: '0\.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0\.5rem' \}\}>/g,
  \`<div onClick={() => setAutoPassTrick(!autoPassTrick)} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>\`
);
code = code.replace(/<\/label>/g, '</div>');

fs.writeFileSync('src/components/GameBoard.jsx', code);

let css = fs.readFileSync('src/index.css', 'utf8');
css += \`
/* Toggle Switch */
.toggle-switch {
  width: 40px;
  height: 22px;
  background-color: var(--border);
  border-radius: 11px;
  position: relative;
  transition: background-color 0.3s;
}
.toggle-switch.active {
  background-color: var(--primary);
}
.toggle-knob {
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.toggle-switch.active .toggle-knob {
  transform: translateX(18px);
}
\`;
fs.writeFileSync('src/index.css', css);
