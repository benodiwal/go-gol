import { useEffect, useRef, useState } from "react";
import { Message } from "./types";

const App = () => {
  const [sessions, setSessions] = useState<number>(0);
  const [sineValue, setSineValue] = useState<number>(0);
  const [cosineValue, setCosineValue] = useState<number>(0);
  const [radius, setRadius] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ws = useRef<WebSocket | null>(null);

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
      ctx.strokeStyle = '#4fd1c5';  // teal color
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX + cosineValue * scale, centerY - sineValue * scale, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#f56565';  // red color
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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center font-sans text-gray-100">
      <h1 className="text-3xl font-bold text-teal-300 mb-6">go-gol</h1>
      <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
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
          className="rounded-full shadow-lg bg-gray-800"
        />
      </div>
      <input
        type="number"
        value={radius}
        onChange={handleRadiusChange}
        min="1"
        step="0.1"
        className="w-24 p-2 text-lg bg-gray-800 border-2 border-teal-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
    </div>
  )
}

export default App;
