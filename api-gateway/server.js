require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const services = [
  { name: "Users", path: "/users", target: "http://localhost:5001" },
  { name: "Vehicles", path: "/vehicles", target: "http://localhost:5002" },
  { name: "Bookings", path: "/bookings", target: "http://localhost:5003" },
  { name: "Reviews", path: "/reviews", target: "http://localhost:5004" },
  { name: "Maintenance", path: "/maintenance", target: "http://localhost:5005" },
];

function createDocsProxy(servicePath, target) {
  const proxy = createProxyMiddleware({
    target: `${target}/api-docs`,
    changeOrigin: true,
  });

  const docsProxy = (req, res, next) => {
    const queryIndex = req.originalUrl.indexOf("?");
    const pathOnly =
      queryIndex === -1 ? req.originalUrl : req.originalUrl.slice(0, queryIndex);
    const search = queryIndex === -1 ? "" : req.originalUrl.slice(queryIndex);

    if (pathOnly === `${servicePath}/api-docs`) {
      return res.redirect(`${servicePath}/api-docs/${search}`);
    }

    return proxy(req, res, next);
  };

  docsProxy.upgrade = proxy.upgrade;

  return docsProxy;
}

function createServiceProxy(servicePath, target) {
  return createProxyMiddleware({
    target: `${target}${servicePath}`,
    changeOrigin: true,
  });
}

// Logger
app.use((req, res, next) => {
  console.log(`Gateway -> ${req.method} ${req.originalUrl}`);
  next();
});

app.get(["/api-docs", "/api-docs/"], (req, res) => {
  const links = services
    .map(
      (service) => `<li><a href="${service.path}/api-docs/">${service.name} API Docs</a></li>`
    )
    .join("");

  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>API Gateway Docs</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 640px;
        margin: 40px auto;
        padding: 0 16px;
        line-height: 1.6;
      }

      h1 {
        margin-bottom: 8px;
      }

      ul {
        padding-left: 20px;
      }

      a {
        color: #0b57d0;
      }
    </style>
  </head>
  <body>
    <h1>API Gateway Docs</h1>
    <p>Select a microservice Swagger page:</p>
    <ul>${links}</ul>
  </body>
</html>`);
});

services.forEach((service) => {
  app.use(`${service.path}/api-docs`, createDocsProxy(service.path, service.target));
  app.use(service.path, createServiceProxy(service.path, service.target));
});

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on ${process.env.PORT}`);
});
