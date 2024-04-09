from flask import Flask
from flask_bcrypt import Bcrypt
import numpy as np
import pandas as pd
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)


