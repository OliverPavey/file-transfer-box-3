# File Transfer Box (FTB) Windows Service Beta

## Requirements

- GoLang 1.23.0 or above installed
- The static site created in `..\ftb-server\src\main\resources\static` as detailed in the client build instructions in the README.md in the folder above this.

## Building the service

Run `build.bat`

N.B. If the service is installed the service must be deleted for the build to succeed.

## Installing the service

- Build the service
- `isntall_service install`
- `install_service start`

## Deleting the service

- `install_service stop`
- `install_service delete`
