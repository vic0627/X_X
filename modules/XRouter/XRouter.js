export default class XRouter {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.loadInitialRoute();
  }

  loadInitialRoute() {
    const pathName = window.location.pathname;
    this.navigate(pathName);
  }

  navigate(pathName) {
    const route = this.matchRoute(pathName);
    if (route) {
      this.currentRoute = route;
      this.renderRoute(route);
    } else {
      console.error(`Route not found for path ${pathName}`);
    }
  }

  matchRoute(pathName) {
    return this.routes.find((route) => route.path === pathName);
  }

  renderRoute(route) {
    const app = document.getElementById("app");
    app.innerHTML = route.component;
  }
}
