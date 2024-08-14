import { useEffect, useRef, useState } from "react"
import { Message } from "./types";

const App = () => {
  const [sessions, setSessions] = useState<number>(0);
  const [sineValue, setSineValue] = useState<number>(0);
  const [cosineValue, setCosineValue] = useState<number>(0);
  const [radius, setRadius] = useState<number>(1);
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
          setRadius(msg.value);
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

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRadius = parseFloat(e.target.value);
    sendRadius(newRadius);
    setRadius(newRadius);
  }

  const sendRadius = async (radius: number) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(radius));
    }
  }

  return (
    <div>
      <p>Active Sessions: {sessions}</p>
      <p>Sine Value: {sineValue}</p>
      <p>Cosine Value: {cosineValue}</p>
      <p>Radius: {radius}</p>
      <input type="number"  value={radius} onChange={handleRadiusChange}/>
      Hi there!!
    </div>
  )
}

export default App
