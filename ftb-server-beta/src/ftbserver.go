package main

import (
	"fmt"
	"net/http"
	"strings"
)

var resource_map map[string][]byte = get_resource_map()

var ftb_folder string = FtbFolder()

func filenameFromURI(uri string) string {
	lastForwardSlash := strings.LastIndex(uri, "/")
	return uri[lastForwardSlash+1:]
}

type HttpHandler struct{}

func (HttpHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("%s %s\n", r.Method, r.URL)
	switch true {
	case r.Method == "GET" && (r.RequestURI == "/" || r.RequestURI == ""):
		GetMappedResource(w, "/index.html")
	case r.Method == "GET" && resource_map[r.RequestURI] != nil:
		GetMappedResource(w, r.RequestURI)
	case r.Method == "GET" && (r.RequestURI == "/api/folder" || r.RequestURI == "/api/folder/"):
		w.Write([]byte(ftb_folder))
	case r.Method == "GET" && (r.RequestURI == "/api/list" || r.RequestURI == "/api/list/"):
		ListFiles(w, ftb_folder)
	case r.Method == "GET" && strings.HasPrefix(r.RequestURI, "/api/pull/"):
		RetrieveFile(w, ftb_folder, filenameFromURI(r.RequestURI))
	case r.Method == "POST" && strings.HasPrefix(r.RequestURI, "/api/push/"):
		UploadFile(w, ftb_folder, filenameFromURI(r.RequestURI), r)
	case r.Method == "DELETE" && strings.HasPrefix(r.RequestURI, "/api/drop/"):
		DeleteFile(w, ftb_folder, filenameFromURI(r.RequestURI))
	default:
		Get404Error(w)
	}
}

func Server() {
	httpHandler := HttpHandler{}
	port := FtbPort()
	fmt.Printf("Listening on port %s\n", port)
	http.ListenAndServe(":"+port, httpHandler)
}
