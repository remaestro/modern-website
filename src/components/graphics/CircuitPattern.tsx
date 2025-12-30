export default function CircuitPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg 
        className="absolute top-0 right-0 w-1/2 h-1/2" 
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF87" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        
        {/* Circuit lines */}
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none">
          <path d="M50,50 L150,50 L150,150" />
          <path d="M200,50 L300,50 L300,150 L200,150" />
          <path d="M50,200 L100,200 L100,300" />
          <path d="M250,200 L350,200 L350,300" />
          <circle cx="150" cy="50" r="3" fill="#00FF87"/>
          <circle cx="150" cy="150" r="3" fill="#00FF87"/>
          <circle cx="300" cy="150" r="3" fill="#00D4FF"/>
          <circle cx="100" cy="200" r="3" fill="#00FF87"/>
          <circle cx="350" cy="300" r="3" fill="#00D4FF"/>
        </g>
      </svg>
      
      <svg 
        className="absolute bottom-0 left-0 w-1/2 h-1/2" 
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none">
          <path d="M100,100 L200,100 L200,200" />
          <path d="M300,100 L350,100 L350,200" />
          <path d="M50,250 L150,250 L150,350" />
          <circle cx="200" cy="100" r="3" fill="#00FF87"/>
          <circle cx="200" cy="200" r="3" fill="#00D4FF"/>
          <circle cx="150" cy="350" r="3" fill="#00FF87"/>
        </g>
      </svg>
    </div>
  );
}
