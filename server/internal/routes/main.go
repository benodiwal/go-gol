package routes

import "github.com/gorilla/mux"

type Router struct {
	Engine *mux.Router
}

func New() *Router {
	return &Router{
		Engine: mux.NewRouter(),
	}
}
