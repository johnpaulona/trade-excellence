#!/usr/bin/env python3
import http.server
import os
import pathlib
import urllib.parse

DIST = pathlib.Path(r'E:\Freelance\Trade Excellence\WEB\te-site\dist')

class CleanURLHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        path = urllib.parse.unquote(self.path.split('?')[0].split('#')[0])
        rel = path.lstrip('/')
        full = DIST / rel
        filepath = None
        if full.is_file():
            filepath = full
        elif pathlib.Path(str(full) + '.html').is_file():
            filepath = pathlib.Path(str(full) + '.html')
        elif full.is_dir() and (full / 'index.html').is_file():
            filepath = full / 'index.html'
        if not filepath:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(('Not found: ' + path).encode())
            return
        ext = filepath.suffix.lower()
        mime = {'.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
                '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
                '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff',
                '.woff2': 'font/woff2', '.ttf': 'font/ttf'}.get(ext, 'application/octet-stream')
        data = filepath.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', mime)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', 8089), CleanURLHandler)
    print('Serving at http://localhost:8089')
    server.serve_forever()
