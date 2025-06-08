package main

import (
	"log"
	"os"
)

func FtbFolder() string {
	return getenv("FTB_STORAGE_FOLDER", defaultStorageFolder())
}

func FtbPort() string {
	return getenv("FTB_PORT", "8055")
}

func getenv(key, fallback string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
}

func defaultStorageFolder() string {
	dirname, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}
	return dirname + "/.ftb"
}
