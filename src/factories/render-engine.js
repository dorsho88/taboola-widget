import sponsoredTemplate from "../templates/sponsored.html"
import organicTemplate from "../templates/organic.html"

export default class RenderEngine {
  constructor() {
    this.templates = {
      sponsored: sponsoredTemplate,
      organic: organicTemplate
    }
  }

  render(templateName, data) {
    const template = this._getRenderTemplate(templateName)

    const dataModel = {
      title: data.name,
      imageUrl: data.thumbnail[0].url,
      branding: data.branding,
      url: data.url
    }
    const resolved = this._mustache(template, dataModel)
    return resolved;
  }

  _getRenderTemplate(templateName) {
    return this.templates[templateName] || "" // default
  }

  _mustache(string, data) {
    if (typeof (string) === "string" && typeof (data) === "object") {
      for (let key in data) {
        string = string.replace(new RegExp("{{\\s*" + key + "\\s*}}", "g"), data[key]);
      }
    };
    return string;
  };
}