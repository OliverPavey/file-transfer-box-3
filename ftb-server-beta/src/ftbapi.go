package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
)

func Get400Error(w http.ResponseWriter, errorMessage string) {
	fmt.Printf("ERROR: %s\n", errorMessage)
	w.WriteHeader(http.StatusBadRequest)
	io.WriteString(w, fmt.Sprintf("Bad Request: 400. %s\n", errorMessage))
}

func Get404Error(w http.ResponseWriter) {
	w.WriteHeader(http.StatusNotFound)
	io.WriteString(w, "Page not found: 404.")
}

type FileInfo struct {
	Name     string `json:"name"`
	Bytes    int64  `json:"bytes"`
	Modified int64  `json:"modified"`
}

func ListFiles(w http.ResponseWriter, folder string) {
	entries, err := os.ReadDir(folder)
	if err != nil {
		log.Fatal(err)
	} else {
		var infos []FileInfo
		for _, e := range entries {
			if !e.IsDir() {
				name := e.Name()
				info, info_err := e.Info()
				var size int64
				var modified int64
				if info_err == nil {
					size = info.Size()
					modified = info.ModTime().UnixMilli()
				} else {
					size = 0
					modified = 0
				}
				infos = append(infos, FileInfo{name, size, modified})
				json.Marshal(FileInfo{name, size, modified})
				fmt.Println(e.Name())
			}
		}
		json, json_err := json.Marshal(infos)
		if json_err != nil {
			Get400Error(w, json_err.Error())
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.Write(json)
		}
	}
}

func fullFilename(folder string, filename string) string {
	return folder + "/" + filename
}

func RetrieveFile(w http.ResponseWriter, ftb_folder string, filename string) {
	fmt.Printf("Retrieving File: %s\n", filename)

	file, err := os.Open(fullFilename(ftb_folder, filename))
	if err != nil {
		Get400Error(w, fmt.Sprintf("Could not open file. %s", err))
		return
	}
	defer file.Close()

	fileinfo, err := file.Stat()
	if err != nil {
		Get400Error(w, fmt.Sprintf("Could not inspect file. %s", err))
		return
	}
	filesize := fileinfo.Size()
	fmt.Printf("Retrieving Bytes [%d] from file: %s\n", filesize, file.Name())

	buffer := make([]byte, filesize)
	bytesread, err := file.Read(buffer)
	if err != nil {
		Get400Error(w, fmt.Sprintf("Could not read file. %s", err))
		return
	}

	w.Header().Set("Content-Type", "application/octet-stream")
	w.Header().Set("Content-Disposition", fmt.Sprintf("inline; filename=\"%s\"", filename))
	w.Header().Set("Content-Length", strconv.Itoa(bytesread))
	w.Header().Set("Cache-Control", "no-cache")
	w.Write(buffer)
}

func UploadFile(w http.ResponseWriter, ftb_folder string, filename string, r *http.Request) {
	bytes, err := io.ReadAll(r.Body)
	if err != nil {
		Get400Error(w, fmt.Sprintf("Could not read file/body sent. %s", err))
		return
	}
	err = os.WriteFile(fullFilename(ftb_folder, filename), bytes, 0644)
	if err != nil {
		Get400Error(w, fmt.Sprintf("Could write file to disk. %s", err))
		return
	}
	io.WriteString(w, fmt.Sprintf("Received '%s' %d bytes.", filename, len(bytes)))
}

func DeleteFile(w http.ResponseWriter, ftb_folder string, filename string) {
	err := os.Remove(fullFilename(ftb_folder, filename))
	if err != nil {
		Get400Error(w, fmt.Sprintf("Could not remove '%s'. %s", filename, err))
		return
	}
	message := fmt.Sprintf("Dropped '%s'.", filename)
	w.Write([]byte(message))
}
