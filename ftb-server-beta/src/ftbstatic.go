package main

import (
	"net/http"
	"strings"
)

func GetMappedResource(w http.ResponseWriter, uri string) {
	w.Header().Set("Content-Type", contentTypeForExt(extractExt(uri)))
	w.Write(resource_map[uri])
}

func extractExt(filename string) string {
	slices := strings.Split(filename, ".")
	return slices[len(slices)-1]
}

func contentTypeForExt(ext string) string {
	switch strings.ToLower(ext) {
	case "html":
		return "text/html; charset=utf-8"
	case "css":
		return "text/css; charset=utf-8"
	case "js":
		return "application/javascript; charset=utf-8"
	case "json":
		return "application/json; charset=utf-8"
	case "png":
		return "image/png"
	case "ico":
		return "image/ico"
	default:
		return "plain/text; charset=utf-8"
	}
}
