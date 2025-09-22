const mobileHost = "edge-device-adaptation-mobile.contentstackapps.com";
const webHost = "edge-device-adaptation-test.contentstackapps.com";

export default async function handler(request) {
  rid = generateRandomString(10);
  const userAgentHeader = request.headers.get('User-Agent');
  const modifiedUrl = new URL(request.url);
  console.log(rid,isMobile(userAgentHeader))
  if (isMobile(userAgentHeader)) {
    modifiedUrl.hostname = mobileHost;
  } else {
    modifiedUrl.hostname = webHost;
  }
console.log(rid,modifiedUrl.hostname)
  const newRequest = new Request(modifiedUrl, request);
  const r = fetch(newRequest);
  console.log(rid,r.status)
  return r;
}

function isMobile(userAgent) {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(userAgent);
}
function generateRandomString(length) {
  return Math.random().toString(36).substring(2, length + 2);
}
