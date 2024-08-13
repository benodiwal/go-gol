package handlers

import (
	"log"
	"net/http"
	"time"

	"github.com/benodiwal/server/internal/routines"
	"github.com/benodiwal/server/internal/utils"
)

func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	ws, err := utils.Upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Failed to upgrade WebSocket: ", err)
		return
	}
	defer ws.Close()

	utils.Mutex.Lock()
	utils.Clients[ws] = true
	utils.Mutex.Unlock()

	routines.Register()

	for {
		time.Sleep(10*time.Second)
	}
}
