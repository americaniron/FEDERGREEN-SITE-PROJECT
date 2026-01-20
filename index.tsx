
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- DIAGNOSTICS & ERROR OVERLAY ---
const reportError = (msg: string, source?: string, lineno?: number, colno?: number, error?: Error) => {
  let overlay = document.getElementById('diagnostics-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'diagnostics-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '999999';
    document.body.appendChild(overlay);
  }
  
  overlay.style.display = 'block';
  overlay.innerHTML = `
    <div style="background: #422A5A; color: #FCFCFC; padding: 40px; min-height: 100vh; font-family: sans-serif; border-top: 5px solid #50346C;">
      <h1 style="font-family: serif; font-size: 3rem; margin-bottom: 20px;">Institutional Node Error.</h1>
      <div style="background: rgba(252, 252, 252, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(80, 52, 108, 0.2);">
        <p style="color: #FCFCFC; font-weight: bold; margin-bottom: 8px;">UNCAUGHT EXCEPTION DETECTED</p>
        <p style="font-family: monospace; font-size: 14px; margin-bottom: 20px;">${msg}</p>
        <p style="color: #646268; font-size: 12px;">Source: ${source || 'Unknown'} Line: ${lineno || '?'}</p>
        ${error?.stack ? `<pre style="font-size: 10px; color: #FCFCFC; overflow: auto; margin-top: 20px; padding: 15px; background: #3C2454; border-radius: 8px;">${error.stack}</pre>` : ''}
      </div>
      <button onclick="window.location.reload()" style="margin-top: 30px; background: #50346C; color: #FCFCFC; border: none; padding: 15px 30px; border-radius: 8px; font-weight: 900; text-transform: uppercase; cursor: pointer;">Reset Node Protocol</button>
    </div>
  `;
};

window.onerror = (msg, source, lineno, colno, error) => {
  reportError(msg.toString(), source, lineno, colno, error);
};

window.onunhandledrejection = (event) => {
  reportError(`Unhandled Promise Rejection: ${event.reason}`, 'Promise', 0, 0);
};

// Boot Banner (Confirmation)
const bootBanner = document.createElement('div');
bootBanner.id = 'boot-banner';
bootBanner.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#422A5A;color:#FCFCFC;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:0.4em;padding:4px 20px;z-index:999998;text-align:center;pointer-events:none;border-bottom: 1px solid #50346C;';
bootBanner.innerText = `Node Mount Active | ${new Date().toLocaleTimeString()} | Protocol Heritage-Resolved`;
document.body.appendChild(bootBanner);
setTimeout(() => {
  bootBanner.style.transition = 'opacity 2s ease';
  bootBanner.style.opacity = '0';
  setTimeout(() => bootBanner.remove(), 2000);
}, 3000);

const rootElement = document.getElementById('root');
if (!rootElement) {
  reportError("Could not find root element (#root) to mount the React tree.");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (e: any) {
  reportError(e.message, 'React Mounting', 0, 0, e);
}
