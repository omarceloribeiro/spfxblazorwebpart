# spfxblazorwebpart

Project initative to create a spfx webpart that uses blazor as framework.

## Description

The goal is be able to select the framework option "Blazor WebAssembly" during the process of creating a spfx webapart.
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

* SPFX
* Blazor WebAssembly

### Installing

* Blazor app
```
Upload the published blazorapp folder to a SharePoint Library
``` 

* SPFX WebPart
```
copy the url of the blazorapp folder and set to the baseAppUrlon HelloWorldWebPart.ts  
var baseAppUrl = "https://site.sharepoint.com/sites/site1/SiteAssets/blazorapp1/";
```

### Executing program

* Run the SPFX
* Add the HelloWorld1 webpart to the page
```
gulp serve
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
