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
  blazorAppUrl: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  //private baseAppUrl = this.properties.blazorAppUrl;
  private blazorLoadCount = 0;
  private blazorStarted = false;
  private blazorLoaded = false;
  private appDivElementId = "app";
  private fieldBlazorAppUrl = "";

  protected override get isRenderAsync(): boolean {
    return true;
  }

  public render(): void {

    this.ensureBlazorAppUrl();
    console.log("render started");
    console.log("blazorLoaded = " + this.blazorLoaded);
    console.log("blazorStarted = " + this.blazorStarted); 

    if (this.blazorLoaded && this.blazorStarted){
      //var myWindow: any = window;
      //myWindow._spWebPartDataLoaded = true;
      // TODO: refresh blazor app div
      console.log("TODO: refresh blazor app div");
    }

    this.domElement.addEventListener("DOMContentLoaded", function() {
      console.log("DOM loaded");
    });

    this.domElement.innerHTML = `
    <section class="${styles.helloWorld} ${!!this.context.sdks.microsoftTeams ? styles.teams : ''}">
    <div>  
    <div id="${this.appDivElementId}">
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
      </div>
    </section>`;
    console.log("render - html setted to domElement innerHTML");

    if (this.fieldBlazorAppUrl){
      if (!this.blazorStarted){
        this.startBlazor().then(() => { 
          this.FixHyperlinksSPDataInterception();
          this.FixHyperlinksHome();
          console.log("render completed.");
          this.renderCompleted(); 
        });
      }
      else{
        this.renderCompleted();
      }
    }
    else{
      this.renderCompleted();
    }
  }
  
  protected onInit(): Promise<void> {
    console.log("onInit");
    this.ensureBlazorAppUrl();
   
      if (this.fieldBlazorAppUrl){
      var baseHead = document.createElement('base');
      baseHead.setAttribute("href", window.location.pathname);
      //document.head.appendChild(baseHead);
      //window.location.hash("/CoolApp/");
      //history.pushState(null, "", window.location.href + '/');

      return this.loadBlazorBundle()
                    .then(() =>{
                      this.blazorLoaded = true;
                    }).then(() => {
                      this._getEnvironmentMessage().then(message => {
                      this._environmentMessage = message;
                      });
                    });
      }
      else
      {
        return new Promise((resolve, reject)=> { resolve(); });
      }
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
                }),
                PropertyPaneTextField('blazorAppUrl', {
                  label: strings.BaseAppUrlFieldLabel
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

  protected ensureBlazorAppUrl(){
    if (this.properties.blazorAppUrl)
      this.fieldBlazorAppUrl = this.properties.blazorAppUrl;
    else {
      // TODO: get url of sharepoint appcatalogcdn
      let urlCDN = "https://3nc1np.sharepoint.com/sites/appcatalog/ClientSideAssets";
      let webPartId = "f431737f-d74e-421a-a3fe-2174e48ca884";
      let blazorFolder = "blazorapp1";
      this.fieldBlazorAppUrl = urlCDN + "/" + webPartId + "/" + blazorFolder + "/";
    }
  }

  protected loadBlazorBundle(): Promise<void>{
    const myPromise = new Promise<void>((resolve, reject) => {
    this.blazorLoadCount++;
    console.log("blazor bundle load started " + this.blazorLoadCount); 

      this.loadBlazorCSS()
        .then(() => this.loadBlazorJS()
          .then(() => {
            console.log("blazor bundle load finished " + this.blazorLoadCount);
            resolve();
          })
        );
    });

    return myPromise;
  }

  protected async loadBlazorCSS(): Promise<void>{
    debugger;
    console.log("loadBlazorCSS - " + this.fieldBlazorAppUrl);
    await this.loadCSS(this.fieldBlazorAppUrl + "css/bootstrap/bootstrap.min.css");
    await this.loadCSS(this.fieldBlazorAppUrl + "css/app.css");
    await this.loadCSS(this.fieldBlazorAppUrl + "BlazorApp1.styles.css");
  }

  protected async loadBlazorJS(): Promise<void>{
    await this.loadJS(this.fieldBlazorAppUrl + "_framework/blazor.webassembly.js", 'true', true);
    await this.loadJS(this.fieldBlazorAppUrl + "myscript.js");
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

  protected FixHyperlinksSPDataInterception(){
    console.log("fixing hyperlinks settting data-interception = off");

    var appDiv = this.getAppDivElement();
    if (appDiv){
      var myArray: any = Array;
        myArray.from(appDiv.getElementsByTagName("a"))
        .forEach(function (item: any) {
          item.setAttribute("data-interception", "off");
        });
    }
  }

  protected FixHyperlinksHome(){
    console.log("fixing hyperlinks home, where href empty, set to root");
    
    var appDiv = this.getAppDivElement();
    if (appDiv){
    var myArray: any = Array;
      myArray.from(document.getElementsByTagName("a"))
      .forEach(function (item: any) {
        if (item.getAttribute("href") == ""){
          item.setAttribute("href", "./");
        }  
      });
    }
  }

  protected startBlazor() : Promise<void>{
    console.log("blazor is start started.");
    let windowObj:any = window;
    return windowObj.Blazor.start({
      loadBootResource: (type: any, name: any, defaultUri: any, integrity: any) => {
        let newResourceUrl = this.fieldBlazorAppUrl +`_framework/${name}`;
        console.log(`Loading: '${type}', '${name}', '${newResourceUrl}', '${integrity}'`);
          return  newResourceUrl;
          // switch (type) {
          //     case 'dotnetjs':
          //     case 'dotnetwasm':
          //     case 'timezonedata':
          //         return `https://site.sharepoint.com/sites/TesteMR2/SiteAssets/blazorapp1/_framework/${name}`;
          // }
      }
  }).then(() => {
    console.log("blazor start finished.");
    this.blazorStarted = true;
  });
  }

  protected getAppDivElement(){
    let appDivElement = document.getElementById(this.appDivElementId);
    return appDivElement;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    console.log("onAfterPropertyPaneChangesApplied - properties saved " + this.fieldBlazorAppUrl);
    console.log("onAfterPropertyPaneChangesApplied - properties saved " + this.properties.description);
    this.ensureBlazorAppUrl();
    if (this.fieldBlazorAppUrl && !this.blazorLoaded && !this.blazorStarted){
      this.loadBlazorBundle().then(() => this.startBlazor()).then(() => console.log("done."));
    }
  }
  
  protected onPropertyPaneConfigurationComplete(): void {
    console.log("onPropertyPaneConfigurationComplete - properties saved " + this.fieldBlazorAppUrl);
    console.log("onPropertyPaneConfigurationComplete - properties saved " + this.properties.description);
    this.ensureBlazorAppUrl();
    if (this.fieldBlazorAppUrl && !this.blazorLoaded && !this.blazorStarted){
      this.loadBlazorBundle().then(() => this.startBlazor());
    }
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  
}
