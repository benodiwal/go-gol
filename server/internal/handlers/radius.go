package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/benodiwal/server/internal/utils"
)

func HandleRadiusUpdate(w http.ResponseWriter, r *http.Request) {
	var payload struct {
		Radius float64 `json:"radius"`
	}
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	
	utils.Mutex.Lock()

	utils.R = payload.Radius
	fmt.Fprintf(w, "Radius updated to : %f", utils.R)

	defer utils.Mutex.Unlock()

	w.WriteHeader(http.StatusOK)
}
