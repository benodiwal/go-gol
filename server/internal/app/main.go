package app

import (
	"log"
	"net/http"

	"github.com/benodiwal/server/internal/env"
	"github.com/benodiwal/server/internal/routes"
	"github.com/rs/cors"
)

func Run() {
	env.Load()

	router := routes.New()
	router.RegisterRoutes()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
	})
	handler := c.Handler(router.Engine)

	port := ":" + env.Read(env.PORT)
	log.Printf("Server starting on %s", port)
	log.Fatal(http.ListenAndServe(port, handler))
}
