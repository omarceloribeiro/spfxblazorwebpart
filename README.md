# spfxblazorwebpart

Project initative to create a spfx webpart that uses blazor as framework.

## Description

The goal is be able to select the framework option "Blazor WebAssembly" during the process of creating a spfx webapart.

![blazor webpart](https://raw.githubusercontent.com/omarceloribeiro/spfxblazorwebpart/main/blazorwebpart.png)



ex:

```sh
yo @microsoft/sharepoint --skip-install

     _-----_     ╭──────────────────────────╮
    |       |    │      Welcome to the      │
    |--(o)--|    │  SharePoint Online SPFx  │
   `---------´   │          Yeoman          │
    ( _´U`_ )    │     Generator@1.14.0     │
    /___A___\   /╰──────────────────────────╯
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

Let's create a new SharePoint solution.
? What is your solution name? spfxplay-01
? Which type of client-side component to create? WebPart
Add new Web part to solution spfxplay-01.
? What is your Web part name? HelloWorld
? Which template would you like to use? "Blazor WebAssembly"
```



## Getting Started

### Dependencies

* [SharePoint Framework](https://aka.ms/spfx)
* [Blazor WebAssembly](https://dotnet.microsoft.com/pt-br/apps/aspnet/web-apps/blazor)
* [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

### Installing

* Blazor app
```
Upload the published blazorapp folder to a SharePoint Library
``` 

* SPFX WebPart
```
copy the url of the blazorapp folder and set to the baseAppUrlon HelloWorldWebPart.ts  
var baseAppUrl = "https://site.sharepoint.com/sites/site1/SiteAssets/blazorapp1/";

set tenant url on initialPage in serve.json
ex:
"initialPage": "https://site.sharepoint.com/sites/site1/_layouts/workbench.aspx"
```

### Executing program

* inside App1 folder
* npm install
* Run the SPFX
* Add the HelloWorld1 webpart to the page
```
npm install
gulp serve
```

### Executing blazor app alone

* inside BlazorApp1 folder

Use Visual Studio to open BlazorApp1.sln

Or use VS Code

```
code .
dotnet watch run --project BlazorApp1
```


## Help


## Authors

Marcelo Ribeiro - 
[https://twitter.com/MarceloE2K](https://twitter.com/MarceloE2K)

## Version History

* 0.1
    * Initial Project

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
