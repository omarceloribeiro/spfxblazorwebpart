# spfxblazorwebpart

Project initative to create a spfx webpart that uses blazor as framework.

Please see the Issues tab and the Milestones to see what is missing to get a working version of a blazor webpart.

Also please see the [Contributing guidelines](https://github.com/omarceloribeiro/spfxblazorwebpart/blob/main/CONTRIBUTING.md).

Initiative also submitted on SharePoint sp-dev-docs github:
https://github.com/SharePoint/sp-dev-docs/issues/9137
still on triage.

Demo blazor webppart navigation video

[See Demo Video](https://github.com/omarceloribeiro/spfxblazorwebpart/blob/main/DemoVideo.md)

At the moment, no changes was required to be made on blazor app project. everything is working with a default blazor web assembly project.

## Version History

* 0.2
    * Fixed navigaiton issues   
* 0.1
    * Initial Project


## Description

The goal is be able to select the framework option "Blazor WebAssembly" during the process of creating a spfx webapart.

![blazor webpart](https://raw.githubusercontent.com/omarceloribeiro/spfxblazorwebpart/main/blazorwebpart.png)

![blazor webpart2](https://raw.githubusercontent.com/omarceloribeiro/spfxblazorwebpart/main/webpart-addedonpage2.PNG)


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

### Next steps

* Access sharepoint list from blazor app using current credentials
* create c# library to access list data
* package the blazorapp within the webpart folder

## Getting Started

### Dependencies

* [SharePoint Framework](https://aka.ms/spfx)
* [Blazor WebAssembly](https://dotnet.microsoft.com/pt-br/apps/aspnet/web-apps/blazor)
* [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
* [Node v16.20.1](https://nodejs.org/en/blog/release/v16.20.1) (not higer than v16)
* [NPM 8.19.4](https://docs.npmjs.com/cli/v8?v=true) (not higher than v8)
  
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

* The page where the webpart is added (worbench or sometestpage.aspx) needs to end with / in order to blazor app routes work properly

### Executing blazor app alone

* inside BlazorApp1 folder

Use Visual Studio to open BlazorApp1.sln

Or use VS Code

```
code .
dotnet watch run --project BlazorApp1
```

## Help

* error: Failed to find a valid digest in the 'integrity' attribute for resource
  
solution: open blazor solution, Delete obj and bin folder, publish solution again
https://stackoverflow.com/questions/69926878/failed-to-find-a-valid-digest-in-the-integrity-attribute-for-resource-in-blazo

* error: messages pointing to localhost

solution: review the baseAppUrl

# Implementation History

Sharepoint has a framework (SPFX) to build modern web parts using pure javascript or any javascript framework (default is react)
so I published a blazor projeto to a folder in a sharepoint library,
then I Loaded the blazor javascripts to page head during the webpart render, and then initialized blazor.
for the resources to work, I had to set the property bootLoadResrouces, is a parameter on blazor start method, specifying the url where the blazorapp bundle scripts are located. so everthing got to work.
had some compability issues with blazor route and sharepoint navigation, because sharepoint default behavior is to intercept all link events in order to load the content content via ajax, without podtback, so I managed to disable that behavior to all blazor app links. then everything worked as expected.
the only issue is that the url must ends with slash /, othewise the blazor navigation goes to sharepoint root and the site is not found. so just need to add a / at the end of url.
the final result was pretty cool, great to see blazor working in sharepoint. will be much easier to develop spfx webparts using blazor instead of react. blazor is much simple, while react has ton of libraries and componentes states and rules.
would be a good option to build webparts like employee bithdays, company next events, current wheater, current pending approvals, company city holidays, etc!


## Authors

* Marcelo Ribeiro
     * [LinkedIn](https://www.linkedin.com/in/marcelo-henrique-fernandes-ribeiro-a8654a2b)
     * [Facebook](https://www.facebook.com/marcelohenrique.ribeiro.9?mibextid=D4KYlr)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/omarceloribeiro/spfxblazorwebpart/blob/main/LICENSE) file for details
