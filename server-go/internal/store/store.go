package store

import (
	"database/sql"
	_ "github.com/lib/pq"
)

type Store struct {
	config   *Config
	db       *sql.DB
	UserRepo *UserRepo
}

func New(config *Config) *Store {
	return &Store{
		config: config,
	}
}

func (s *Store) Open() error {
	db, err := sql.Open("postgres", s.config.DatabaseUrl)
	if err != nil {
		return err
	}

	if err := db.Ping(); err != nil {
		return err
	}

	s.db = db

	return nil
}

func (s *Store) Close() {
	s.db.Close()
}

func (s *Store) User() *UserRepo {
	if s.UserRepo != nil {
		return s.UserRepo
	}

	s.UserRepo = &UserRepo{
		store: s,
	}

	return s.UserRepo
}
