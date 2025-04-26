import React from 'react'

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      {/* Footer */}
      <footer className="text-center mt-4 p-3 border-top">
       { <a href="/">Home</a> | <a href="#">Contact</a> }
        <p className="mt-2">Copyright © GIOER 2025</p>
       </footer>
    </div>
  
  )
}
