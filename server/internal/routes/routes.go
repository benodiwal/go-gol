package routes

import "github.com/benodiwal/server/internal/handlers"

func (router *Router) RegisterRoutes() {
	router.Engine.HandleFunc("/", handlers.HealthCheck)
	router.Engine.HandleFunc("/health", handlers.HealthCheck)
	router.Engine.HandleFunc("/ws/sine", handlers.HandleSineConnections)
	router.Engine.HandleFunc("/ws/cosine", handlers.HandleCosineConnections)
}
