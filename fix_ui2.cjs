const fs = require('fs');
let code = fs.readFileSync('src/components/GameBoard.jsx', 'utf8');

const badInsertion = `                   {isMe && (
                     <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                       <div onClick={() => setAutoPassTrick(!autoPassTrick)} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                         <div className={\`toggle-switch \${autoPassTrick ? 'active' : ''}\`}>
                           <div className="toggle-knob"></div>
                         </div>
                         이번 트릭 계속 패스 (자동)
                       </div>
                     </div>
                   )}`;
code = code.replace(badInsertion, '');

const checkboxRegex = /<input type="checkbox" checked=\{autoPassTrick\} onChange=\{\(e\) => setAutoPassTrick\(e\.target\.checked\)\} style=\{\{ transform: 'scale\(1\.2\)' \}\} \/>/g;
const toggleHtml = '<div className={`toggle-switch ${autoPassTrick ? \'active\' : \'\'}`}>\n                      <div className="toggle-knob"></div>\n                    </div>';

code = code.replace(checkboxRegex, toggleHtml);

code = code.replace(
  /<label style=\{\{ color: 'var\(--text-secondary\)', fontSize: '0\.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0\.5rem' \}\}>/g,
  '<div onClick={() => setAutoPassTrick(!autoPassTrick)} style={{ color: \'var(--text-secondary)\', fontSize: \'0.9rem\', cursor: \'pointer\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\', gap: \'0.5rem\', marginTop: \'0.5rem\' }}>'
);
code = code.replace(/                    <\/div>\n                    이번 트릭 계속 패스 \(자동\)\n                  <\/label>/, '                    </div>\n                    이번 트릭 계속 패스 (자동)\n                  </div>');

fs.writeFileSync('src/components/GameBoard.jsx', code);

let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.toggle-switch')) {
css += '\n/* Toggle Switch */\n.toggle-switch {\n  width: 40px;\n  height: 22px;\n  background-color: var(--border);\n  border-radius: 11px;\n  position: relative;\n  transition: background-color 0.3s;\n}\n.toggle-switch.active {\n  background-color: var(--primary);\n}\n.toggle-knob {\n  width: 18px;\n  height: 18px;\n  background-color: white;\n  border-radius: 50%;\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);\n  box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n}\n.toggle-switch.active .toggle-knob {\n  transform: translateX(18px);\n}\n';
fs.writeFileSync('src/index.css', css);
}
