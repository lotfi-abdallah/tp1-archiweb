import express, { Request, Response } from "express";
import path from "path";
import https from "https";
import http from "http";
import fs from "fs";

const options = {
  key: fs.readFileSync(path.join(__dirname, "../cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../cert", "cert.pem")),
};

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/produit/:id", (_req: Request, res: Response) => {
  res.json({ produit: "Produit: " + _req.params.id, stock: 100 });
});

app.post("/produit", (req: Request, res: Response) => {
  res.status(201).json({ message: "Produit créé avec succès" });
});

// Proposer différents types de réponses de la part du serveur NodeJS au client, en testant les méthodes de l’objet response dont celle permettant la redirection.
app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello from NodeJS server!");
});
app.get("/redirect", (_req: Request, res: Response) => {
  res.redirect("/");
});
app.get("/notfound", (_req: Request, res: Response) => {
  res.status(404).send("Resource not found");
});
app.get("/json", (_req: Request, res: Response) => {
  res.json({ message: "This is a JSON response" });
});
app.get("/download", (_req: Request, res: Response) => {
  const file = path.join(__dirname, "../public", "index.html");
  res.download(file);
});
app.get("/headers", (req: Request, res: Response) => {
  res.set("Custom-Header", "HeaderValue");
  res.send("Check the headers for a custom value");
});

const HTTP_PORT = 3188;
const HTTPS_PORT = 3189;

http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
});

https.createServer(options, app).listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});
