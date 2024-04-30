import { renderToString } from "@gov-design-system-ce/components/dist/hydrate";
import http from "http";
import * as zlib from "zlib";
import { Readable, pipeline } from "stream";

const targetUrl = "https://gov-design-test.vercel.app";
const PORT = 3001;

const server = http.createServer((req, res) => {
  const fullUrl = targetUrl + req.url;
  const proxyReq = http.request(
    fullUrl,
    {
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      const contentType = proxyRes.headers["content-type"] || "";
      if (!contentType.includes("text/html")) {
        res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
        return;
      }

      let chunks: Buffer[] = [];
      const contentEncoding = proxyRes.headers["content-encoding"];
      let decompressor: zlib.Gunzip | zlib.Inflate | null = null;

      if (contentEncoding === "gzip") {
        decompressor = zlib.createGunzip();
      } else if (contentEncoding === "deflate") {
        decompressor = zlib.createInflate();
      }

      const dataStream = decompressor ? proxyRes.pipe(decompressor) : proxyRes;
      dataStream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      dataStream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const body = buffer.toString();
        modifyHtml(body).then((modifiedHtml) => {
          const readable = Readable.from(modifiedHtml);
          if (decompressor) {
            const compressor =
              contentEncoding === "gzip"
                ? zlib.createGzip()
                : zlib.createDeflate();
            res.writeHead(proxyRes.statusCode || 500, {
              ...proxyRes.headers,
              "content-encoding": contentEncoding,
            });
            pipeline(readable, compressor, res, (err) => {
              if (err) console.error("Pipeline failed:", err);
            });
          } else {
            res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
            readable.pipe(res);
          }
        });
      });
    }
  );

  proxyReq.on("error", (err) => {
    console.error("Proxy error:", err);
    if (!res.headersSent) {
      res.writeHead(500);
    }
    res.end("Proxy error");
  });

  req.pipe(proxyReq, { end: true });
});

async function modifyHtml(html: string) {
  return (await renderToString(html)).html;
}

server.listen(PORT, () => {
  console.log(`Proxy server running on the port ${PORT}`);
});
