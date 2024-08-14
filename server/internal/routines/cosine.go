package routines

import (
	"math"

	"github.com/benodiwal/server/internal/utils"
)

type CosineRoutine struct {}

func (c CosineRoutine) Run() {
	for range utils.Angle {
		value := math.Cos(<-utils.Angle)
		
		utils.Mutex.Lock()
		scaledValue := utils.R*value
		utils.Mutex.Unlock()
		
		utils.Broadcast <- utils.Message{ Type: "cosine", Value: scaledValue }
	}	
}
