# Taboola-Widget

Taboola-Widget is a recommendations widget built in vanilla javaScript using Taboola API.

## Installation

For the widget to work there are 3 simple steps to follow:
   * Create a div with id 'widget-div': 
```   <div id="widget-div"></div> ```, and place it in your html where you want the widget to appear.

* Copy the snippet from ```demo/index.html``` or ``` dist/index.html ``` 
```
  <script>
    (function (w, d, s, o, f, js, fjs) {
      w['Taboola-Widget'] = o;
      w[o] = w[o] || function () {
        (w[o].q = w[o].q || []).push(arguments)
      };
      js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
      js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
    }(window, document, 'script', 'mw', './widget.js'));
    mw('init', { someConfiguration: 42 });
    mw('optional-supported-action', 'optional-param');
  </script>
```
and paste it in your html.

* Make sure ```dist/widget.js``` is in the same directory as your html.

## Run

For easy serving with http please run ```npx http-server``` in ```dist``` and go to ```http://127.0.0.1:8080```
