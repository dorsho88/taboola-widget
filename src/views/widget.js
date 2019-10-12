import './style.css';
import WidgetFactory from "../factories/widget-factory.js";
// export API url
const API = "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&count=4&source.type=video&source.id=214321562187&source.url=http://www.site.com/videos/214321562187.html";


export default class Widget {

    constructor() {
        this._widgetFactory = new WidgetFactory();
    }

    _compose(data) {
        const widgetContainer = document.getElementById('widget-div');
        const widgetBody = document.createElement('div');
        widgetBody.className = 'widget-body'
        widgetContainer.appendChild(widgetBody);
        const parsedData = JSON.parse(data);

        for (let i = 0; i < parsedData.list.length; i++) {
            let origin = parsedData.list[i].origin;
            let type = parsedData.list[i].type;

            // api returns images as type "video"?!?! why?!?! 
            // hard setting to type "image" for candidacy test purpose only.  
            type = "image";

            const widgetItem = this._widgetFactory.create(origin, type, parsedData.list[i]);
            widgetBody.appendChild(widgetItem);
        }
    }

    _callApi() {
        const self = this;
        // actual request  - export this setting
        if (window.XMLHttpRequest) {
            //Firefox, Opera, IE7, and other browsers will use the native object
            var request = new XMLHttpRequest();
        } else {
            //IE 5 and 6 will use the ActiveX control
            var request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                // Typical action to be performed when the document is ready:
                self._compose(request.responseText);
            }
        };
        request.open("GET", API, true);
        request.send();
    }
}