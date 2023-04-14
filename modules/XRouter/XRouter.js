export default class XRouter {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.loadInitialRoute();
  }

  loadInitialRoute() {
    this.navigate("/X_X");
  }

  navigate(pathName) {
    const route = this.matchRoute(pathName);
    console.log(route);
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
    history.pushState(route.name, "", route.path);
  }
}
