package apiserver

import (
	"database/sql"
	"net/http"
	"server-go/internal/app/store/sqlstore"
)

func Start(config *Config) error {
	db, err := newDB(config.DatabaseURL)
	if err != nil {
		return err
	}

	defer db.Close()
	store := sqlstore.New(db)
	s := newServer(store)
	return http.ListenAndServe(config.BindAddr, s)
}

func newDB(database string) (*sql.DB, error) {
	db, err := sql.Open("postgres", database)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
