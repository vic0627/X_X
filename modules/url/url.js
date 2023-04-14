window.$url = window.location.href;
window.$path = $url.substring(0, $url.lastIndexOf("/") + 1);

const reDirectUrl = (href) => href.replace("@", $path);

export { reDirectUrl };
