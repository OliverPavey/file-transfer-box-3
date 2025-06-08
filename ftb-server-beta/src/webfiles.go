package main

import _ "embed"

// Genreated by gen_webfiles.go

// How to embed resources into GoLang executables:
// https://stackoverflow.com/questions/17796043/how-to-embed-files-into-go-binaries

//go:embed web/about_favicon.txt
var about_favicon_txt []byte

//go:embed web/android-chrome-192x192.png
var android_chrome_192x192_png []byte

//go:embed web/android-chrome-512x512.png
var android_chrome_512x512_png []byte

//go:embed web/apple-touch-icon.png
var apple_touch_icon_png []byte

//go:embed web/asset-manifest.json
var asset_manifest_json []byte

//go:embed web/favicon-16x16.png
var favicon_16x16_png []byte

//go:embed web/favicon-32x32.png
var favicon_32x32_png []byte

//go:embed web/favicon.ico
var favicon_ico []byte

//go:embed web/index.html
var index_html []byte

//go:embed web/manifest.json
var manifest_json []byte

//go:embed web/robots.txt
var robots_txt []byte

//go:embed web/site.webmanifest
var site_webmanifest []byte

//go:embed web/static/css/main.4783ae8f.css
var main_4783ae8f_css []byte

//go:embed web/static/css/main.4783ae8f.css.map
var main_4783ae8f_css_map []byte

//go:embed web/static/js/main.b66cd392.js
var main_b66cd392_js []byte

//go:embed web/static/js/main.b66cd392.js.LICENSE.txt
var main_b66cd392_js_LICENSE_txt []byte

//go:embed web/static/js/main.b66cd392.js.map
var main_b66cd392_js_map []byte

func get_resource_map() map[string][]byte {
	return map[string][]byte{
		"/about_favicon.txt": about_favicon_txt,
		"/android-chrome-192x192.png": android_chrome_192x192_png,
		"/android-chrome-512x512.png": android_chrome_512x512_png,
		"/apple-touch-icon.png": apple_touch_icon_png,
		"/asset-manifest.json": asset_manifest_json,
		"/favicon-16x16.png": favicon_16x16_png,
		"/favicon-32x32.png": favicon_32x32_png,
		"/favicon.ico": favicon_ico,
		"/index.html": index_html,
		"/manifest.json": manifest_json,
		"/robots.txt": robots_txt,
		"/site.webmanifest": site_webmanifest,
		"/static/css/main.4783ae8f.css": main_4783ae8f_css,
		"/static/css/main.4783ae8f.css.map": main_4783ae8f_css_map,
		"/static/js/main.b66cd392.js": main_b66cd392_js,
		"/static/js/main.b66cd392.js.LICENSE.txt": main_b66cd392_js_LICENSE_txt,
		"/static/js/main.b66cd392.js.map": main_b66cd392_js_map,
	}
}