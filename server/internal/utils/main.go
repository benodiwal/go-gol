package utils

import (
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var (
	Clients = make(map[*websocket.Conn]bool)
	Broadcast = make(chan Message)
	Upgrader = websocket.Upgrader {
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	Mutex sync.Mutex
	R = 1.0
)

type Message struct {
	Type  string  `json:"type"`
	Value float64 `json:"value"`
}
