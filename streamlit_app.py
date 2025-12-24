import streamlit as st
import streamlit.components.v1 as components
import os

st.set_page_config(layout="wide", page_title="React Todo App")

# Path to the build directory
build_dir = os.path.join(os.path.dirname(__file__), "dist")

# Use declare_component to serve the build directory as a custom component
# This allows Streamlit to serve the static files correctly.
if os.path.exists(build_dir):
    try:
        # Check if we are running locally or in cloud. 
        # declare_component works by serving the path statically.
        component = components.declare_component("react_todo_app", path=build_dir)
        
        # Render the component
        # We might need to adjust height. Since the app is responsive, strict height might be needed.
        # A standard full-page app might need a taller iframe.
        component(key="todo_app")
        
        # Note: For the app to dynamically resize, it would need to import Streamlit's JS helper.
        # For now, we assume a reasonable default height.
    except Exception as e:
        st.error(f"Error loading component: {e}")
else:
    st.error("Build directory not found. Please run `npm run build` first.")
