package routines

type Routine interface {
	Run()
}

func startRoutine(r Routine) {
	go r.Run()
}

func Register() {
	sineRoutine := SineRoutine {}
	cosineRoutine := CosineRoutine {}
	connectionRoutine := ConnectionRoutine {}
	messageRoutine := MessageRoutine {}

	routines := []Routine {sineRoutine, cosineRoutine, connectionRoutine, messageRoutine}
	for _, r := range routines {
		startRoutine(r)
	}
}
