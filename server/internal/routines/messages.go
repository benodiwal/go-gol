package routines

import (
	"log"

	"github.com/benodiwal/server/internal/utils"
)

type MessageRoutine struct {}

func (m MessageRoutine) Run() {
	for {
		msg := <-utils.Broadcast
		utils.Mutex.Lock()
		for client := range utils.Clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(utils.Clients, client)
			}
		}
		utils.Mutex.Unlock()
	}	
}
