# Welcome!
Thank you for the interest in the project and in Blazor and SharePoint as well.
Lets make a good plataform for development SharePoint webparts and other componenents using Blazor!

# Boundaries of Customizations
This project aims to be a template for new client side webpart projects, so any changes should be tought in a way that it dont require core modifications and is total generic, with no personal path or settings fixed to it.

* Avoid change any core file of SPFX or Blazor Web Assembly project.
  * If is really needed, maybe we can contact the SharePoint dev team and ask to make that change for us.
* Avoid change the blazor app
  * This project is aimed to the SPFX enviroment, with later use of Yeoman to generate the files of the template, the webpart is expected to work with the blazor app as it native form, with no customization or requirement specific to work with SharePoint. in other words, any existing blazor app should be ready to work in SharePoint WebPart without any customizaiton.
  *   * e.g.: Existed an issue that links on blazor app should have the attribute data-interception=off in order to work in SharePoint. Instead place that requirement on blazor app side, the solution was just fix the links after webpart render, so no special requirment was added to blazor app.


# Code

## Naming conventions

  ### C#
  Please use C# naming convention. PascalCase for Class, methods, and public properties. CamelCase for private fields. Please use _ for private variables within a class 
  
  ### Javascript
  Please use Javascript naming conventions, camelCase.

  # Procedure
  
  ## Existing issues
  Just choose an issue to solve and implent the solution. please assign yourself to the issue to otherpeople know that someone is working on that.

  ## New Features
  For new features, please submit a new issue, or just add on comment somewhere, if the feature dont require to change the core files, or core template, and is generic enoguh for a generic start project, so it can be implemented.
