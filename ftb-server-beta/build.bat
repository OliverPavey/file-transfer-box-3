@echo off
setlocal
pushd

if exist "bin\ftbservice.exe" (
    del bin\ftbservice.exe
)

del /S /Q .\src\web\*.* >NUL
xcopy /S /E /C /Q /Y /R ..\ftb-server\src\main\resources\static .\src\web >NUL

go run tools\gen_webfiles.go

cd src
go get golang.org/x/sys
go build -o "../bin/ftbservice.exe"

:done
popd
endlocal