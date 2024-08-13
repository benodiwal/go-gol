package app

import (
	"log"
	"net/http"

	"github.com/benodiwal/server/internal/env"
	"github.com/benodiwal/server/internal/routes"
	"github.com/benodiwal/server/internal/routines"
)

func Run() {
	env.Load()

	router := routes.New()
	router.RegisterRoutes()
	routines.Register()

	port := ":" + env.Read(env.PORT)
	log.Printf("Server starting on %s", port)
	log.Fatal(http.ListenAndServe(port, router.Engine))
}
