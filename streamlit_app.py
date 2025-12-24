import streamlit as st
import streamlit.components.v1 as components
import os
from bs4 import BeautifulSoup
import base64

st.set_page_config(layout="wide", page_title="React Todo App")

# Path to the build directory
BUILD_DIR = os.path.join(os.path.dirname(__file__), "dist")

def load_react_app(build_dir):
    index_path = os.path.join(build_dir, "index.html")
    
    if not os.path.exists(index_path):
        st.error(f"Build directory not found at {build_dir}. Please run `npm run build`.")
        return None

    # Read index.html
    with open(index_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Inline CSS
    # Vite usually puts css in assets/
    for link in soup.find_all('link', rel='stylesheet'):
        href = link.get('href')
        if href:
            # Handle absolute/relative paths from Vite
            # href might be /assets/index.css or ./assets/index.css
            asset_path = href.lstrip('./').lstrip('/')
            full_path = os.path.normpath(os.path.join(build_dir, asset_path))
            
            if os.path.exists(full_path):
                with open(full_path, 'r', encoding='utf-8') as f:
                    # Create style tag
                    new_tag = soup.new_tag('style')
                    new_tag.string = f.read()
                    link.replace_with(new_tag)

    # Inline JS
    for script in soup.find_all('script', src=True):
        src = script.get('src')
        if src:
            asset_path = src.lstrip('./').lstrip('/')
            full_path = os.path.normpath(os.path.join(build_dir, asset_path))
            
            if os.path.exists(full_path):
                with open(full_path, 'r', encoding='utf-8') as f:
                    new_tag = soup.new_tag('script')
                    new_tag.string = f.read()
                    # Remove src attribute since we contain the code now
                    del script['src']
                    script.string = new_tag.string
                    # We keep the script tag but remove src and add content

    return str(soup)

if os.path.exists(BUILD_DIR):
    try:
        html_code = load_react_app(BUILD_DIR)
        if html_code:
            # Render the inlined HTML
            # Adjust height to fit the app; React apps are dynamic so 800px is a safe bet for a Todo list
            components.html(html_code, height=800, scrolling=True)
    except Exception as e:
        st.error(f"Error loading app: {e}")
else:
    st.error("Build directory 'dist' is missing. Did you commit it?")
