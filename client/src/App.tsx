import { useEffect, useRef, useState } from "react";
import { Message } from "./types";
import { useTheme } from "./context/ThemeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className={`font-semibold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              go-gol
            </span>
          </div>
          <div>
            <button
              onClick={toggleDarkMode}
              className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'} px-3 py-2 rounded-md text-sm font-medium`}
            >
              {darkMode ? '🌞 Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  const [sessions, setSessions] = useState<number>(0);
  const [sineValue, setSineValue] = useState<number>(0);
  const [cosineValue, setCosineValue] = useState<number>(0);
  const [radius, setRadius] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ws = useRef<WebSocket | null>(null);
   const { darkMode } = useTheme();

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/ws');
    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
    }
    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data) as unknown as Message;
     
      switch (msg.type) {
        case 'sine':
          setSineValue(msg.value);
          break;
        case 'cosine':
          setCosineValue(msg.value);
          break;
        case 'sessions':
          setSessions(msg.value);
          break;
        case 'radius':
          setRadius(Math.max(1, msg.value));
          break;
        default:
          console.warn("Unknown message type: ", msg.type);
      }
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width/2;
    const centerY = canvas.height/2;
    const scale = 100;

    const drawCircle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * scale, 0, 2 * Math.PI);
      ctx.strokeStyle = '#4fd1c5';  
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX + cosineValue * scale, centerY - sineValue * scale, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#f56565'; 
      ctx.fill();

      ctx.shadowBlur = 10;
      ctx.shadowColor = '#f56565';
      ctx.stroke();
    };

    drawCircle();

    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCircle();
    }, 50);

  }, [sineValue, cosineValue, radius]);

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = Math.max(1, parseFloat(e.target.value));
    sendRadius(newRadius);
    setRadius(newRadius);
  }

  const sendRadius = async (radius: number) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(radius));
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20 font-sans">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-teal-300' : 'text-blue-600'} mb-6`}>go-gol</h1>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 mb-6 shadow-lg`}>
          <p className="text-lg mb-2">Active Sessions: {sessions}</p>
          <p className="text-lg mb-2">Sine Value: {sineValue.toFixed(4)}</p>
          <p className="text-lg mb-2">Cosine Value: {cosineValue.toFixed(4)}</p>
          <p className="text-lg">Radius: {radius}</p>
        </div>
        <div className="relative w-[400px] h-[400px] mb-6">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className={`rounded-full shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          />
        </div>
        <input
          type="number"
          value={radius}
          onChange={handleRadiusChange}
          min="1"
          step="0.1"
          className={`w-24 p-2 text-lg ${darkMode ? 'bg-gray-800 border-teal-500 text-white' : 'bg-white border-blue-500 text-gray-900'} border-2 rounded focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-teal-300' : 'focus:ring-blue-300'}`}
        />
      </div>
    </div>
  );
}

export default App;
