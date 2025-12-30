import { motion } from 'framer-motion';

export default function CityWireframe() {
  // Power line towers data (x, y, height) - EXPANDED
  const towers = [
    { x: 100, y: 620, height: 140 },
    { x: 300, y: 600, height: 160 },
    { x: 550, y: 610, height: 155 },
    { x: 800, y: 595, height: 165 },
    { x: 1050, y: 605, height: 150 },
    { x: 1300, y: 590, height: 170 },
    { x: 1550, y: 610, height: 145 },
    { x: 1800, y: 600, height: 160 },
  ];

  // Buildings data (x, y, width, height) - EXPANDED & MORE BUILDINGS
  const buildings = [
    // Left section
    { x: 50, y: 750, width: 70, height: 180 },
    { x: 140, y: 720, width: 80, height: 210 },
    { x: 240, y: 700, width: 65, height: 230 },
    { x: 325, y: 730, width: 75, height: 200 },
    { x: 420, y: 710, width: 85, height: 220 },
    
    // Center-left section
    { x: 525, y: 740, width: 70, height: 190 },
    { x: 615, y: 720, width: 80, height: 210 },
    { x: 715, y: 695, width: 90, height: 235 },
    { x: 825, y: 725, width: 75, height: 205 },
    { x: 920, y: 710, width: 70, height: 220 },
    
    // Center-right section
    { x: 1010, y: 735, width: 85, height: 195 },
    { x: 1115, y: 715, width: 75, height: 215 },
    { x: 1210, y: 700, width: 80, height: 230 },
    { x: 1310, y: 720, width: 70, height: 210 },
    { x: 1400, y: 730, width: 85, height: 200 },
    
    // Right section
    { x: 1505, y: 710, width: 75, height: 220 },
    { x: 1600, y: 740, width: 70, height: 190 },
    { x: 1690, y: 720, width: 80, height: 210 },
    { x: 1790, y: 735, width: 75, height: 195 },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Green glow filter for buildings */}
        <filter id="greenGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Power Lines Group */}
      <g id="powerLines">
        {towers.map((tower, i) => {
          const nextTower = towers[i + 1];
          const baseY = tower.y + tower.height;
          
          return (
            <g key={`tower-${i}`}>
              {/* Tower structure */}
              <motion.path
                d={`
                  M ${tower.x - 15},${baseY}
                  L ${tower.x},${tower.y}
                  L ${tower.x + 15},${baseY}
                  M ${tower.x},${tower.y}
                  L ${tower.x},${tower.y - 20}
                `}
                stroke="white"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />

              {/* Cross bars */}
              <motion.line
                x1={tower.x - 25}
                y1={tower.y + 30}
                x2={tower.x + 25}
                y2={tower.y + 30}
                stroke="white"
                strokeWidth="2.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.2 + 0.5 }}
              />

              {/* Power cables to next tower */}
              {nextTower && (
                <>
                  <motion.path
                    d={`M ${tower.x - 20},${tower.y + 30} Q ${(tower.x + nextTower.x) / 2},${Math.max(tower.y, nextTower.y) + 50} ${nextTower.x - 20},${nextTower.y + 30}`}
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.25 }}
                    transition={{ duration: 1.5, delay: 1.5 + i * 0.2 }}
                  />
                  <motion.path
                    d={`M ${tower.x},${tower.y + 30} Q ${(tower.x + nextTower.x) / 2},${Math.max(tower.y, nextTower.y) + 45} ${nextTower.x},${nextTower.y + 30}`}
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.25 }}
                    transition={{ duration: 1.5, delay: 1.6 + i * 0.2 }}
                  />
                  <motion.path
                    d={`M ${tower.x + 20},${tower.y + 30} Q ${(tower.x + nextTower.x) / 2},${Math.max(tower.y, nextTower.y) + 50} ${nextTower.x + 20},${nextTower.y + 30}`}
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.25 }}
                    transition={{ duration: 1.5, delay: 1.7 + i * 0.2 }}
                  />
                </>
              )}
            </g>
          );
        })}
      </g>

      {/* Buildings Group */}
      <g id="buildings">
        {buildings.map((building, i) => {
          const topY = building.y - building.height;
          const buildingDelay = 2.5 + (i * 0.1);
          const glowDelay = buildingDelay + 1.5;
          
          return (
            <g key={`building-${i}`}>
              {/* Building outline */}
              <motion.path
                d={`
                  M ${building.x},${building.y}
                  L ${building.x},${topY}
                  L ${building.x + building.width},${topY}
                  L ${building.x + building.width},${building.y}
                `}
                stroke="white"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ 
                  duration: 1.2, 
                  delay: buildingDelay,
                  ease: "easeOut"
                }}
              />

              {/* Window grid (vertical lines) */}
              {[0.25, 0.5, 0.75].map((fraction, idx) => (
                <motion.line
                  key={`v-${i}-${idx}`}
                  x1={building.x + building.width * fraction}
                  y1={building.y}
                  x2={building.x + building.width * fraction}
                  y2={topY}
                  stroke="white"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.2 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: buildingDelay + 0.5 + (idx * 0.1)
                  }}
                />
              ))}

              {/* Green glow effect - progressive light up from bottom to top */}
              <motion.rect
                x={building.x}
                y={topY}
                width={building.width}
                height={building.height}
                fill="none"
                stroke="#00FF87"
                strokeWidth="2"
                filter="url(#greenGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0, 0.6, 0.4],
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: glowDelay,
                  ease: "easeInOut"
                }}
              />

              {/* Light up windows with green glow progressively */}
              {Array.from({ length: Math.floor(building.height / 25) }).map((_, rowIdx) => (
                <g key={`windows-row-${i}-${rowIdx}`}>
                  {[0.2, 0.4, 0.6, 0.8].map((fraction, colIdx) => (
                    <motion.circle
                      key={`light-${i}-${rowIdx}-${colIdx}`}
                      cx={building.x + building.width * fraction}
                      cy={building.y - (rowIdx * 25) - 12}
                      r="2"
                      fill="#00FF87"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0.8, 1],
                        scale: [0, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 0.6,
                        delay: glowDelay + (rowIdx * 0.05) + (colIdx * 0.02),
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      style={{
                        filter: 'drop-shadow(0 0 3px #00FF87)',
                      }}
                    />
                  ))}
                </g>
              ))}

              {/* Antenna on some buildings */}
              {i % 4 === 0 && (
                <motion.path
                  d={`
                    M ${building.x + building.width / 2},${topY}
                    L ${building.x + building.width / 2},${topY - 30}
                    M ${building.x + building.width / 2 - 8},${topY - 20}
                    L ${building.x + building.width / 2 + 8},${topY - 20}
                  `}
                  stroke="white"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ duration: 0.5, delay: glowDelay + 0.5 }}
                />
              )}
            </g>
          );
        })}
      </g>

      {/* Ground connections */}
      <motion.line
        x1="0"
        y1="950"
        x2="1920"
        y2="950"
        stroke="white"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: 6 }}
      />

      {/* Connection lines from buildings to ground */}
      {buildings.filter((_, i) => i % 3 === 0).map((building, i) => (
        <motion.line
          key={`connection-${i}`}
          x1={building.x + building.width / 2}
          y1={building.y}
          x2={building.x + building.width / 2}
          y2="950"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.15 }}
          transition={{ duration: 0.8, delay: 6 + (i * 0.1) }}
        />
      ))}
    </svg>
  );
}
