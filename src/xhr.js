export default function xhr(method, url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = new global.XMLHttpRequest();
    req.open(method, url);

    req.onload = function onLoad() {
      // Attempt to parse JSON and return data.
      if (req.status >= 200 && req.status < 300) {
        try {
          const data = JSON.parse(this.response);
          resolve(data);
        } catch (error) {
          // Interpret invalid JSON response as an Internal Server Error.
          reject(new Error(500));
        }
      } else {
        // Return HTTP status code for error.
        reject(new Error(req.status));
      }
    };

    req.onerror = function onError() {
      reject(new Error(0));
    };

    const data = options.data ? JSON.stringify(options.data) : null;
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(data);
  });
}
