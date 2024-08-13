package routines

import (
	"math"
	"time"

	"github.com/benodiwal/server/internal/utils"
)

type SineRoutine struct {}

func (s SineRoutine) Run() {
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for range ticker.C {
		t := float64(time.Now().UnixNano()) / 1e9
		value := math.Sin(t)
		
		utils.Mutex.Lock()
		scaledValue := utils.R*value
		utils.Mutex.Unlock()
		
		utils.Broadcast <- utils.Message{ Type: "sine", Value: scaledValue }
	}	
}
