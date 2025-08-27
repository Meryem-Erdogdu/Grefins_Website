import webbrowser
import os
import sys

def open_website():
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Path to the index.html file
    website_path = os.path.join(script_dir, 'index.html')
    
    # Check if the file exists
    if os.path.exists(website_path):
        # Open in the default browser
        print(f"Opening {website_path}")
        webbrowser.open(f'file://{website_path}')
        print("Website should now be open in your default browser.")
        print("If it doesn't open, please check that the file exists and your browser is working properly.")
    else:
        print(f"Error: Could not find {website_path}")
        print("Please make sure you're running this script from the correct directory.")

def start_server():
    try:
        import http.server
        import socketserver
        import threading
        
        PORT = 8000
        Handler = http.server.SimpleHTTPRequestHandler
        
        # Change to the script directory
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)
        
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Server started at http://localhost:{PORT}")
            print("Press Ctrl+C to stop the server")
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\nServer stopped.")
    except Exception as e:
        print(f"Error starting server: {e}")

if __name__ == "__main__":
    print("GREFINS Website Launcher")
    print("========================")
    print("1. Open website in browser")
    print("2. Start local server")
    print("3. Exit")
    
    choice = input("Enter your choice (1-3): ")
    
    if choice == "1":
        open_website()
    elif choice == "2":
        start_server()
    elif choice == "3":
        print("Exiting...")
        sys.exit(0)
    else:
        print("Invalid choice. Exiting...")
        sys.exit(1)