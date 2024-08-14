package routines

import (
	"math"

	"github.com/benodiwal/server/internal/utils"
)

type SineRoutine struct {}

func (s SineRoutine) Run() {
	for range utils.Angle {
		value := math.Sin(<-utils.Angle)
		utils.Mutex.Lock()
		scaledValue := utils.R*value
		utils.Mutex.Unlock()
		
		utils.Broadcast <- utils.Message{ Type: "sine", Value: scaledValue }
	}	
}
