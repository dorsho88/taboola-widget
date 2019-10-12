import RenderEngine from "./render-engine.js"

export default class WidgetFactory {
  constructor() {
    this._renderEngine = new RenderEngine();
  }

  create(adType, componentType, data) {
    switch (componentType) {
      case "image":
        return this._getImageComponent(adType, data)
      case "video":
        return this._getVideoComponent(adType, data)
      default:
        console.error("no such type")
    }
  }

  _getImageComponent(adType, data) {
    const template = this._getImageTemplate(adType, data)
    const parser = new DOMParser();
    const comp = parser.parseFromString(template, "text/html");
    return comp.body;
  }

  _getImageTemplate(adType, data) {
    const template = this._renderEngine.render(adType, data);
    return template;
  }
}