import Widget from './views/widget'
const supportedAPI = ['init', 'optional-supported-action']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)


export default class Main {
    constructor() {
        this._widget = new Widget();
    }
    _app(window) {
        // set default configurations
        let configurations = {
            someDefaultConfiguration: false
        };
        // all methods that were called till now and stored in queue
        // needs to be called now 
        let globalObject = window[window['Taboola-Widget']];
        let queue = globalObject.q;
        if (queue) {
            for (var i = 0; i < queue.length; i++) {
                if (queue[i][0].toLowerCase() == 'init') {
                    configurations = this.extendObject(configurations, queue[i][1]);
                    console.log('Widget initiating', configurations);
                    this._widget._callApi();
                }
                else
                    this._apiHandler(queue[i][0], queue[i][1]);
            }
        }
        // override temporary (until the app loaded) handler
        // for widget's API calls
        globalObject = this._apiHandler;
        globalObject.configurations = configurations;
    }

    //  Method that handles all API calls
    _apiHandler(api, params) {
        if (!api) throw Error('API method required');
        api = api.toLowerCase();

        if (supportedAPI.indexOf(api) === -1) throw Error(`Method ${api} is not supported`);

        console.log(`Handling API call ${api} with params: `, params);

        switch (api) {
            case 'optional-supported-action':
                this._optionalActionMethod(params)
                break;
            default:
                console.warn(`No handler defined for ${api}`);
        }
    }

    _optionalActionMethod(params) {
        console.log('optional-supported-action done')
    }

    extendObject(a, b) {
        for (var key in b)
            if (b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }
}



const main = new Main();
main._app(window);

