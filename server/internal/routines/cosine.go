package routines

import (
	"math"
	"time"

	"github.com/benodiwal/server/internal/utils"
)

type CosineRoutine struct {}

func (c CosineRoutine) Run() {
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for range ticker.C {
		t := float64(time.Now().UnixNano()) / 1e9
		value := math.Cos(t)
		
		utils.Mutex.Lock()
		scaledValue := utils.R*value
		utils.Mutex.Unlock()
		
		utils.Broadcast <- utils.Message{ Type: "cosine", Value: scaledValue }
	}	
}
