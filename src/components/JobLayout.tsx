import { useState } from 'react';

export default function JobLayout() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`job ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M512 503.5H381.7a48 48 0 01-45.3-32.1L265 268.1l-9-25.5 2.7-124.6L338.2 8.5l23.5 67.1L512 503.5z" fill="#0473ff" />
            <path fill="#0473ff" d="M361.7 75.6L265 268.1l-9-25.5 2.7-124.6L338.2 8.5z" />
            <path d="M338.2 8.5l-82.2 234-80.4 228.9a48 48 0 01-45.3 32.1H0l173.8-495h164.4z" fill="#0473ff" />
          </svg>
          Smart Job Search
        </div>
        <div className="header-menu">
          <a href="#" className="active">Find Job</a>
          <a href="#">Company Review</a>
          <a href="#">Find Salaries</a>
        </div>
        <div className="user-settings">
          <div className="dark-light" onClick={() => setDarkMode(!darkMode)}>
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </div>
          <div className="user-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
          </div>
          <img className="user-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
          <div className="user-name">User Profile</div>
        </div>
      </div>
      <div className="wrapper">
        <div className="search-menu">
          <div className="search-bar">
            <input type="text" className="search-box" autoFocus />
            <div className="search-item">
              Product Designer
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
          </div>
          <div className="search-location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Location
          </div>
          <button className="search-button">Find Job</button>
        </div>
        <div className="main-container">
          {/* Content will go here */}
        </div>
      </div>
    </div>
  );
}
