# go-gol

go-gol is a Go-based web application that dynamically draws points on a circle using websockets. It demonstrates the use of goroutines, websockets, and real-time data visualization.

## Features

- Real-time visualization of sine and cosine functions
- Dynamically adjustable circle radius
- Websocket-based communication between server and clients
- Multi-session support with session count display
- Animated point drawing with fade-off transitions

## Technologies Used

- Backend: Go
- Frontend: React with TypeScript
- Websockets: gorilla/websocket
- HTTP Router: gorilla/mux

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/go-gol.git
cd go-gol
```

2. Install backend dependencies:
```bash
cd server
go mod tidy
```

3. Install frontend dependencies:
```bash
cd client
yarn
```

## Running the Application

1. Start the backend server:
```bash
make dev
```

2. In a separate terminal, start the frontend development server:
```bash
cd client
yarn dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

- The application will start with a default circle (radius = 1).
- Points representing sine and cosine values will be drawn on the circle in real-time.
- Use the input field to change the radius of the circle.
- Open multiple tabs to see the session count increase.

## License

This project is licensed under the [MIT License](LICENSE).
