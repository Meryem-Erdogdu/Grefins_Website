import http.server
import socketserver
import webbrowser
import os
import threading
import time

# Set the port for the local server
PORT = 8000

# Change to the website directory
os.chdir(r"c:\Users\LENOVO\Desktop\grefins website")

# Define the handler for serving files
Handler = http.server.SimpleHTTPRequestHandler

# Create the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving GREFINS website at http://localhost:{PORT}")
    
    # Open the website in the default browser
    webbrowser.open(f"http://localhost:{PORT}")
    
    print("Website should now be open in your browser.")
    print("Press Ctrl+C to stop the server.")
    
    try:
        # Start the server
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")