import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorldWebPart.module.scss';
import * as strings from 'HelloWorldWebPartStrings';



export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private baseAppUrl = "https://3nc1np.sharepoint.com/sites/TesteMR1/SiteAssets/blazorapp1/";
  private blazorLoadCount = 0;
  private blazorInitialized = false;
  private blazorLoaded = false;


  public render(): void {

    console.log("render");
    console.log("blazorLoaded = " + this.blazorLoaded);
    console.log("blazorStarted = " + this.blazorInitialized); 

    if (this.blazorLoaded && this.blazorInitialized){
      console.log("refresh blazor app div");
      

      
    }
 // navigator.serviceWorker.register('https://site.sharepoint.com/sites/TesteMR2/SiteAssets/TesteApp1/app1/service-worker.js');

    this.domElement.addEventListener("DOMContentLoaded", function() {
      //Blazor.start();
      console.log("DOM loades");
    });



    this.domElement.innerHTML = `
    <section class="${styles.helloWorld} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
      <div id="app">
        Loading Blazor...
        <div class="${styles.welcome}">
          <img alt="" src="${this._isDarkTheme ? require('./assets/welcome-dark.png') : require('./assets/welcome-light.png')}" class="${styles.welcomeImage}" />
          <h2>Well done, ${escape(this.context.pageContext.user.displayName)}!</h2>
          <div>${this._environmentMessage}</div>
          <div>Web part property value: <strong>${escape(this.properties.description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
          The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
            <ul class="${styles.links}">
              <li><a href="https://aka.ms/spfx" target="_blank">SharePoint Framework Overview</a></li>
              <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank">Use Microsoft Graph in your solution</a></li>
              <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank">Build for Microsoft Teams using SharePoint Framework</a></li>
              <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
              <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank">Publish SharePoint Framework applications to the marketplace</a></li>
              <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank">SharePoint Framework API reference</a></li>
              <li><a href="https://aka.ms/m365pnp" target="_blank">Microsoft 365 Developer Community</a></li>
            </ul>
        </div>
      </div>
    </section>`;
  }

  protected onDisplayModeChanged(oldDisplayMode: DisplayMode): void {
    console.log("onDisplayModeChanged");
    // 1 display
    // 2 edit
    let displayModeText = "";
    switch (oldDisplayMode){
      case 1 : displayModeText = "display"; break;
      case 2 : displayModeText = "edit"; break;
      default: displayModeText = "" + oldDisplayMode;
    }
      
    console.log("display mode changed. old display mode = " + displayModeText);
  }
  
  

  protected loadBlazor(): Promise<void>{

    const myPromise = new Promise<void>((resolve, reject) => {
    this.blazorLoadCount++;
    console.log("blazor bundle load " + this.blazorLoadCount); 
    //this.loadBlazorCSS();
    //this.loadBlazorScripts();

    // css
    this.loadCSS(this.baseAppUrl + "css/bootstrap/bootstrap.min.css")
      .then(() => this.loadCSS(this.baseAppUrl + "css/app.css"))
        .then(()=>this.loadCSS(this.baseAppUrl + "BlazorApp1.styles.css"))
          .then(() => this.loadJS(this.baseAppUrl + "_framework/blazor.webassembly.js", 'true', true))
            .then(() => this.loadJS(this.baseAppUrl + "myscript.js"))
              .then(() => {
                console.log("blazor bundle loaded " + this.blazorLoadCount);
                resolve();
              });
    });

    return myPromise;
  }

  protected loadBlazorCSS(){
    this.loadCSS(this.baseAppUrl + "css/bootstrap/bootstrap.min.css");
    this.loadCSS(this.baseAppUrl + "css/app.css");
    this.loadCSS(this.baseAppUrl + "BlazorApp1.styles.css");
  }

  protected loadBlazorScripts(){
    this.loadJS(this.baseAppUrl + "_framework/blazor.webassembly.js", 'true', true);
    this.loadJS(this.baseAppUrl + "myscript.js");
  }

  protected loadJS(FILE_URL : string, async : string = 'true', addAutoStartFalse : boolean = false): Promise<void> {
    const myPromise = new Promise<void>((resolve, reject) => {

      let scriptEle = document.createElement("script");
      
      scriptEle.setAttribute("src", FILE_URL);
      scriptEle.setAttribute("type", "text/javascript");
      scriptEle.setAttribute("async", async);

      if (addAutoStartFalse)
        scriptEle.setAttribute("autostart", "false");
    
      document.body.appendChild(scriptEle);
    
      // success event 
      scriptEle.addEventListener("load", () => {
        console.log("JS File loaded");
        resolve();
      });
      // error event
      scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
        reject(ev);
      });
    });

    return myPromise;
  }

  protected loadCSS(FILE_URL : string): Promise<void> {
    const myPromise = new Promise<void>((resolve, reject) => {
      let scriptEle = document.createElement("link");
      
      scriptEle.setAttribute("rel", 'stylesheet');
      scriptEle.setAttribute("type", "text/css");
      scriptEle.setAttribute("href", FILE_URL);
    
      document.head.appendChild(scriptEle);
    
      // success event 
      scriptEle.addEventListener("load", () => {
        console.log("CSS File loaded");
        resolve();
      });
      // error event
      scriptEle.addEventListener("error", (ev) => {
        console.log("Error on loading file", ev);
        reject(ev);
      });
    });

    return myPromise;
  }

  protected onInit(): Promise<void> {

    
    console.log("onInit");
    var baseHead = document.createElement('base');
    baseHead.setAttribute("href", window.location.pathname + "/");
    //document.head.appendChild(baseHead);
    //window.location.hash("/CoolApp/");
    history.pushState(null, "", window.location.href + '/');

    this.loadBlazor()
    .then(() =>{
      this.blazorLoaded = true;
      console.log("Loading Blazor...");
      this.startBlazor(this);
    });
    

    setTimeout(function () { 
      //alert("Starting Blazor");
      //console.log("Loading Blazor...");
      //this.startBlazor(this);
      //this.window.Blazor.start();
      console.log("timeout executed");
    }, 2000);

    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });

    
  }

  protected startBlazor(context: any){
    
    let windowObj:any = window;
    
    windowObj.Blazor.start({
      loadBootResource: function (type: any, name: any, defaultUri: any, integrity: any) {
        
        var newResourceUrl = context.baseAppUrl +`_framework/${name}`;
        console.log(`Loading: '${type}', '${name}', '${newResourceUrl}', '${integrity}'`);
          return  newResourceUrl;
          // switch (type) {
          //     case 'dotnetjs':
          //     case 'dotnetwasm':
          //     case 'timezonedata':
          //         return `https://site.sharepoint.com/sites/TesteMR2/SiteAssets/blazorapp1/_framework/${name}`;
          // }
      }
  });

  console.log("blazor started");
  this.blazorInitialized = true;

}

  private _getEnvironmentMessage(): Promise<string> {
    console.log("_getEnvironmentMessage");
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected renderCompleted(error?: Error | undefined, didUpdate?: boolean | undefined): void {
    console.log("on renderCompleted");
  }
  
}
