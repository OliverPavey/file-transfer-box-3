package main

import (
	_ "embed"
	"fmt"
	"html/template"
	"os"
	"strings"
)

//go:embed template/webfiles.go.template
var webfiles_go_template_string string

type resource struct {
	Filename string
	Request  string
	Varname  string
}

func lastPart(filename string) string {
	return filename[strings.LastIndex(filename, "/")+1:]
}

func listFiles(indent int, folder string, filelist []string) []string {
	if files, err := os.ReadDir(folder); err == nil {
		for _, file := range files {
			if file.IsDir() {
				var subfolder = fmt.Sprintf("%s/%s", folder, file.Name())
				filelist = listFiles(indent, subfolder, filelist)
			} else {
				var filename = fmt.Sprintf("%s/%s", folder, file.Name())[indent:]
				filelist = append(filelist, filename)
			}
		}
	}
	return filelist
}

func main() {
	var filelist []string
	filelist = listFiles(8, "src/web", filelist)

	var resourcelist []resource
	for _, filename := range filelist {
		res := resource{
			Filename: filename,
			Request:  fmt.Sprintf("/%s", filename),
			Varname:  strings.ReplaceAll(strings.ReplaceAll(lastPart(filename), ".", "_"), "-", "_"),
		}
		resourcelist = append(resourcelist, res)
	}

	const template_name = "webfiles_go_template"
	const target = "src/webfiles.go"
	if webfilesTemplate, err1 := template.New(template_name).Parse(webfiles_go_template_string); err1 != nil {
		println(fmt.Sprintf("Could not compile template: %s", template_name))
	} else {
		if err2 := os.Truncate("src/webfiles.go", 0); err2 != nil {
			println(fmt.Sprintf("Could not erase previous content: %s", target))
		} else {
			if f, err3 := os.OpenFile("src/webfiles.go", os.O_CREATE, 0600); err3 != nil {
				println(fmt.Sprintf("Could not create file: %s", target))
			} else {
				defer f.Close()
				webfilesTemplate.Execute(f, map[string]interface{}{"resources": resourcelist})
			}
		}
	}
}
