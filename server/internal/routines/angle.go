package routines

import (
	"time"

	"github.com/benodiwal/server/internal/utils"
)

type AngleRoutine struct {}

func (a AngleRoutine) Run() {
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for range ticker.C {
		t := float64(time.Now().UnixNano()) / 1e9
		utils.Mutex.Lock()
		utils.Angle <- t
		utils.Mutex.Unlock()
	}
}
