package handlers

import (
	"log"
	"net/http"

	"github.com/benodiwal/server/internal/utils"
)

func HandleCosineConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := utils.Upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	utils.Clients[ws] = true

	for {
		var msg utils.Message
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v", err)
			delete(utils.Clients, ws)
			break
		}
	}
}
