var assert = require('assert');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const namespace = 'mw';
const widgetName = 'Taboola-Widget';

const dom = new JSDOM(`<html><head>
<script>
 (function (w, d, s, o, f, js, fjs) {
    w['${widgetName}'] = o;
    w[o] = w[o] || function () {
        (w[o].q = w[o].q || []).push(arguments)
    };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
   js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
 }(window, document, 'script', '${namespace}', 'widget.js'));
mw('init', { someConfiguration: 42 });
mw('optional-supported-action', 'optional-param');
</script ></head ><body><div id="widget-div"></div></body>`, { runScripts: "dangerously", pretendToBeVisual: true });


describe('Embbed script', function () {
    it('window should be defined', () => {
        expect(dom.window).toBeDefined();
    });
    it('widget name should be defined in window', () => {
        expect(dom.window[widgetName]).toBeDefined();
    });
    it('widget name should be defined in window and should be: ' + namespace, () => {
        expect(dom.window[widgetName]).toEqual(namespace);
    });
});
