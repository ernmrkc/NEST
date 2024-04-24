import subprocess
import os
import threading


def organize_all_files(input_dir, output_dir):
    """
    This function minimizes and complicates css, html, and js files using threads.
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            revised html, css, and js files
    """
    files = os.listdir(input_dir)
    for file in files:
        if file == "en":
            thread = threading.Thread(target=organize_en, args=(input_dir, output_dir))
            thread.start()
        if file == "tr":
            thread = threading.Thread(target=organize_tr, args=(input_dir, output_dir))
            thread.start()
        if file == "index.html":
            print("works in 'index.html' file")
            input_file = "../" + input_dir + file
            output_file = "../" + output_dir + file
            run_html_minifier(input_file, output_file)
        if file == "css":
            thread = threading.Thread(target=organize_css, args=(input_dir, output_dir))
            thread.start()
        if file == "js":
            thread = threading.Thread(target=organize_js, args=(input_dir, output_dir))
            thread.start()


def organize_en(input_dir, output_dir):
    """
    This function revises the en folder
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            revised html files in en folder
    """
    print("works in 'en' folder")
    inner_dir = input_dir + "en/"
    inner_files = os.listdir(inner_dir)
    for inner_file in inner_files:
        input_file = "../" + inner_dir + inner_file
        output_file = "../" + output_dir + "en/" + inner_file
        run_html_minifier(input_file, output_file)


def organize_tr(input_dir, output_dir):
    """
    This function revises the tr folder
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            revised html files in tr folder
    """
    print("works in 'tr' folder")
    inner_dir = input_dir + "tr/"
    inner_files = os.listdir(inner_dir)
    for inner_file in inner_files:
        input_file = "../" + inner_dir + inner_file
        output_file = "../" + output_dir + "tr/" + inner_file
        run_html_minifier(input_file, output_file)


def organize_css(input_dir, output_dir):
    """
    This function revises the css folder
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            revised css files in css folder
    """
    print("works in 'css' folder")
    inner_dir = input_dir + "css/"
    inner_files = os.listdir(inner_dir)
    for inner_file in inner_files:
        input_file = "../" + inner_dir + inner_file
        output_file = "../" + output_dir + "css/" + inner_file
        run_cleancss(input_file, output_file)


def organize_js(input_dir, output_dir):
    """
    This function revises the js folder
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            revised js files in js folder
    """
    print("works in 'js' folder")
    inner_dir = input_dir + "js/"
    inner_files = os.listdir(inner_dir)
    for inner_file in inner_files:
        input_file = "../" + inner_dir + inner_file
        output_file = "../" + output_dir + "js/" + inner_file
        run_js_obfuscator(input_file, output_file)
        run_terser(output_file, output_file)


def run_html_minifier(input_html, output_html):
    """
    This function runs the html-minifier module and minifies html files
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            minified html files
    """
    current_directory = os.getcwd()
    node_js_directory = os.path.join(current_directory, 'node.js')
    command = (f'npx html-minifier --collapse-whitespace --remove-comments --remove-script-type-attributes '
               f'--remove-style-link-type-attributes --minify-js true --minify-css true -o {output_html} {input_html}')
    bash_path = 'C:\\Program Files\\Git\\bin\\bash.exe'
    process = subprocess.run([bash_path, '-c', command], cwd=node_js_directory, capture_output=True, text=True, check=True)


def run_cleancss(input_html, output_html):
    """
    This function runs the cleancss module and minifies css files
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            minified css files
    """
    current_directory = os.getcwd()
    node_js_directory = os.path.join(current_directory, 'node.js')
    command = f'npx cleancss -o {output_html} {input_html}'
    bash_path = 'C:\\Program Files\\Git\\bin\\bash.exe'
    process = subprocess.run([bash_path, '-c', command], cwd=node_js_directory, capture_output=True, text=True, check=True)


def run_js_obfuscator(input_html, output_html):
    """
    This function runs the javascript-obfuscator module and complicates js files
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            complex js files
    """
    current_directory = os.getcwd()
    node_js_directory = os.path.join(current_directory, 'node.js')
    command = f'npx javascript-obfuscator {input_html} --output {output_html}'
    bash_path = 'C:\\Program Files\\Git\\bin\\bash.exe'
    process = subprocess.run([bash_path, '-c', command], cwd=node_js_directory, capture_output=True, text=True, check=True)


def run_terser(input_html, output_html):
    """
    This function runs the cleancss module and minifies js files
    :param input_dir:   input direction
    :param output_dir:  output direction
    :return:            minified js files
    """
    current_directory = os.getcwd()
    node_js_directory = os.path.join(current_directory, 'node.js')
    command = f'npx terser {input_html} -o {output_html} -c -m'
    bash_path = 'C:\\Program Files\\Git\\bin\\bash.exe'
    process = subprocess.run([bash_path, '-c', command], cwd=node_js_directory, capture_output=True, text=True, check=True)


input_dir = 'sources/project-original/'         # input directory includes original files
output_dir = 'output/project-organized/'        # directory where revised files are created
organize_all_files(input_dir, output_dir)
