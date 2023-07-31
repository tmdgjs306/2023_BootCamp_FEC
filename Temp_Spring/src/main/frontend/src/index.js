import React from "react";
import { ReactDOM } from "react";
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";   // Allowing to use react router & setup

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)