import webbrowser
import os

def open_website():
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Path to the index.html file
    website_path = os.path.join(current_dir, 'index.html')
    
    # Check if the file exists
    if os.path.exists(website_path):
        print("Opening GREFINS Website...")
        # Open in the default browser
        webbrowser.open(f'file://{website_path}')
        print("Website should now be open in your default browser.")
        print("\nIf it doesn't open:")
        print("1. Make sure index.html is in the same folder")
        print("2. Try manually opening index.html in your browser")
    else:
        print("Error: Could not find index.html")
        print("Please make sure you're running this script from the correct directory.")

if __name__ == "__main__":
    open_website()
    input("\nPress Enter to close...")