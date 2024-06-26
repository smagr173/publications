# NGAviation MapViewer component

## Setup

To use NGAviation MapView component it's mandatory to keep all provided files on the root of your webserver.
For further usage import main.js and main.css into your project.
Please do so after mounting <div> tag with id "aime-web-client".

Render method is called immediately after the import and will render NGAviation MapViewer component's content into specified div.

After whole loading process is done NGAviation MapViewer component sends message via window.postMessage.
Content:
`{ source: "aime-web-client", event: "loaded", apiControllerTarget: "NGAviationMapViewer" }`
 - *source* property is used to identify the source of the message and always will be the same as name of its root div
 - *event* property is used to identify event type and for the sake of prototype will always be "loaded"
 - *apiControllerTarget* property is used to identify name of window property where whole controller will be placed

After handling this message such as window.addEventListener("message", myFunction), you will have all functionality accessible.

## NGAviationMapViewer Controller API

### Methods

**initialize(config)**

This method should be called right after component's rendering process is over.
After successful run of this method, the map should appear in your application.
> [!IMPORTANT]
> Method call is mandatory for further work with the map
  
Sample config: 

`{ 
    enabledNotamCreation: <Boolean>, 
    adsUri: <String>, 
    workflowUri: <String>, 
    mapboxAccessToken: <String> 
}`

Example usage:

`window.NGAviationMapViewer.initialize({ 
    enabledNotamCreation: true, 
    adsUri: "http://localhost:5160", 
    workflowUri: "http://localhost:5180", 
    mapboxAccessToken: "pk.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxx" 
})`


**selectAndFitToFeature(featureIdentifier)**

Method will set internal state of application to selected feature by provided featureIdentifier.
After successful detail download, its details will show in data browser on the left side.
Also feature's geometry will be highlighted and map will adjust it's viewport to focus on feature's geometry.


**selectAndFitToNotam(notamIdentifier)**

Method will set internal state of application to selected feature by provided notamIdentifier.
After successful detail download, its details will show in data browser on the left side.
Also notam linked features geometries will be highlighted and map will adjust it's viewport to focus on these geometries.


**off(eventType, handler)**

Unregistering event handler.
> [!WARNING]
> This method is for NGAviation MapViewer usage mainly


**on(eventType, handler)**

Registering event handler.
> [!WARNING]
> This method is for NGAviation MapViewer usage mainly


**once(eventType, handler)**

Registering event handler to be called exactly once.
> [!WARNING]
> This method is for NGAviation MapViewer usage mainly


**getConfig()**

This method returns stored configuration provided in initialize method.
> [!CAUTION]
> This method is for NGAviation MapViewer usage only


### Supported event handlers
 - `feature-select` - sends identifier of selected feature when handled
 - `init` - raised when NGAviationMapViewer is initialized