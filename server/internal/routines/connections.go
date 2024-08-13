package routines

import (
	"time"

	"github.com/benodiwal/server/internal/utils"
)

type ConnectionRoutine struct {}

func (c ConnectionRoutine) Run() {
	ticker := time.NewTicker(100 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		utils.Mutex.Lock()
		numberOfClients := len(utils.Clients)
		utils.Mutex.Unlock()
		
		utils.Broadcast <- utils.Message{ Type: "sessions", Value: float64(numberOfClients) }
	}
}
