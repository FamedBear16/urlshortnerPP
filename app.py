from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import json
import os.path


""" HOW TO RUN THE WEB SERVER
    flask --app hello.py:app run
             OR from PowerShell / Terminal NOT from CMD
    set FLASK_APP=hello // $env:FLASK_APP="hello.py" 
    flask run --debug   
"""

app = Flask(__name__)
app.secret_key = "h43425hafasdfsadgfasdgf"


@app.route('/')
def home():
    return render_template("home.html")


@app.route('/get_image_url')
def get_image_url():
    image_url = url_for('static', filename='images/everyday.svg')
    return jsonify(image_url=image_url)


@app.route('/backpack')
def backpack():
    # return ("backpack")
    image_url = url_for('static', filename='images/everyday.svg')
    return render_template("backpack.html", image_url=image_url)


@app.route('/your-url', methods=["GET", "POST"])
def your_url():
    if request.method == "POST":
        urls = {}
        code = request.form["code"]
        url = request.form["url"]

        # open the jsonfile
        if os.path.exists("urls.json"):
            with open("urls.json") as urls_file:
                urls = json.load(urls_file)
            if code in urls.keys():
                flash(
                    "That short name has already been taken. Please select another name")
                return redirect(url_for("home"))

        urls[code] = {"url": url}
        with open("urls.json", "w") as url_file:
            json.dump(urls, url_file)
        return render_template("your_url.html", code=code, url=url)

    else:
        return redirect(url_for("home"))  # redirect("/") is less robust


if __name__ == '__main__':
    app.run()

# Start Command in Render: DEfault Value
# gunicorn your_application.wsgi
# Replace with. it tells python that def app is in app.py
# >gunicorn app:app

# pip install gunicorn
# gunicorn app:app

# git add .
# git commit -m "Initial commit"
# git push origin master
