import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

// Import the main module of your application
import { AppServerModule } from './main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

const DIST_FOLDER = join(process.cwd(), 'dist/dota-shuffle/browser');

const app = express();

const domino = require('domino');
const fs = require('fs');
const path = require('path');
const templateA = fs.readFileSync(path.join(DIST_FOLDER, 'index.html')).toString();
const win = domino.createWindow(templateA);
global['window'] = win;
global['document'] = win.document;

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule,
  })
);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});

// Start up the Node server
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
