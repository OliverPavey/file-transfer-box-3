@ECHO OFF
SETLOCAL
PUSHD .

IF "%1"=="" ECHO Please run from Administrator command prompt
IF "%1"=="" ECHO Syntax: install_service install^|start^|stop^|delete(i.e.uninstall)^|query^|view(i.e.services-control-panel)
IF "%1"=="install" sc.exe create FtbService binPath=%~dp0bin\ftbservice.exe
IF "%1"=="install" sc.exe description FtbService "FTB File Trasnfer Box service."
IF "%1"=="start" sc.exe start FtbService
IF "%1"=="stop" sc.exe stop FtbService
IF "%1"=="delete" sc.exe delete FtbService
IF "%1"=="query" sc.exe query FtbService
IF "%1"=="view" %windir%\system32\services.msc

POPD
ENDLOCAL