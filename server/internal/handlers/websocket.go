package handlers

import (
	"log"
	"net/http"

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
	ws.WriteJSON(utils.Message { Type: "radius", Value: utils.R })
	utils.Mutex.Unlock()

	routines.Register()

	for {
		var newRadius float64
		err := ws.ReadJSON(&newRadius)
		if err != nil {
			log.Println("Error reading from WebSocket: ", err)
			break
		}

		utils.Mutex.Lock()
		utils.R = newRadius
		utils.Broadcast <- utils.Message{Type: "radius", Value: utils.R} 
		utils.Mutex.Unlock()
	}
}
