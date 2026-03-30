require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/booking.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/booking.swagger");
const swaggerUiOptions = {
  customCss: `
    .swagger-ui .responses-table .actual-response-example {
      margin-top: 12px;
    }

    .swagger-ui .responses-table .actual-response-example__title {
      color: #3b4151;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .swagger-ui .responses-table .actual-response-example pre {
      background: #2f2f2f;
      border-radius: 4px;
      color: #ffffff;
      margin: 0;
      overflow-x: auto;
      padding: 12px;
      white-space: pre-wrap;
      word-break: break-word;
    }
  `,
  customJsStr: `
    (function () {
      function escapeHtml(value) {
        return value
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      function getLiveResponseText(row) {
        var pre = row.querySelector("pre");
        if (!pre) {
          return "";
        }

        return (pre.innerText || pre.textContent || "").trim();
      }

      function updateStaticResponses(opblock) {
        var liveRows = Array.from(
          opblock.querySelectorAll(".live-responses-table tbody tr")
        );
        var liveResponsesByStatus = {};

        liveRows.forEach(function (liveRow) {
          var statusCell = liveRow.querySelector(".response-col_status");
          var responseText = getLiveResponseText(liveRow);

          if (!statusCell || !responseText) {
            return;
          }

          var status = (statusCell.textContent || "").trim();

          if (status) {
            liveResponsesByStatus[status] = responseText;
          }
        });

        Array.from(opblock.querySelectorAll(".responses-table tbody tr")).forEach(
          function (staticRow) {
            var statusCell = staticRow.querySelector(".response-col_status");
            var descriptionCell = staticRow.querySelector(".response-col_description");
            var inner =
              descriptionCell &&
              (descriptionCell.querySelector(".response-col_description__inner") ||
                descriptionCell);
            var status = statusCell && (statusCell.textContent || "").trim();
            var responseText = status && liveResponsesByStatus[status];
            var existing = inner && inner.querySelector(".actual-response-example");

            if (!inner) {
              return;
            }

            if (!responseText) {
              if (existing) {
                existing.remove();
              }
              return;
            }

            if (!existing) {
              existing = document.createElement("div");
              existing.className = "actual-response-example";
              inner.appendChild(existing);
            }

            if (existing.getAttribute("data-response-text") === responseText) {
              return;
            }

            existing.setAttribute("data-response-text", responseText);
            existing.innerHTML =
              '<div class="actual-response-example__title">Last actual server response</div>' +
              "<pre>" +
              escapeHtml(responseText) +
              "</pre>";
          }
        );
      }

      function syncAllResponses() {
        Array.from(document.querySelectorAll(".swagger-ui .opblock")).forEach(
          updateStaticResponses
        );
      }

      window.addEventListener("load", function () {
        var root = document.getElementById("swagger-ui");
        var scheduled = false;

        if (!root) {
          return;
        }

        function scheduleSync() {
          if (scheduled) {
            return;
          }

          scheduled = true;
          window.requestAnimationFrame(function () {
            scheduled = false;
            syncAllResponses();
          });
        }

        scheduleSync();

        new MutationObserver(scheduleSync).observe(root, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      });
    })();
  `,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/bookings", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

app.listen(process.env.PORT, () =>
  console.log(`Booking Service running on ${process.env.PORT}`)
);
