import { x_x } from "../X_X.js";
export default class XRouter {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.init = true;
    this.loadInitialRoute();
  }

  loadInitialRoute() {
    return this.navigate(window.location.pathname);
  }

  navigate(pathName) {
    const route = this.matchRoute(pathName);
    if (this.currentRoute === route) return;
    if (route) {
      if (this.init) {
        this.initX_X(route);
      } else {
        this.switchRoute(route);
      }
      this.currentRoute = route;
    } else {
      console.error(`Route not found for path ${pathName}`);
    }
    return route;
  }

  matchRoute(pathName) {
    return this.routes.find((route) => route.path === pathName);
  }

  renderRoute(route) {
    history.pushState(route.name, "", route.path);
  }

  initX_X(route) {
    this.renderRoute(route);
    route.component.addTo(x_x);
    this.init = false;
  }

  switchRoute(route) {
    this.renderRoute(route);
    x_x.children = x_x.children.filter((x) => {
      return x !== this.currentRoute.component;
    });
    route.component.addTo(x_x).create();
    this.currentRoute.component.removeFullTree();
    route.component.renderFullTree();
  }
}
