
# Liver Cirrhosis Survival Predictor Web App

Our project is a Web App that utilizes a logistic regression model to predict if a patient with liver cirrhosis is at risk of death based on several factors. the technologies used in the project are React-Vite for the frontend, and a microservice architecture consisting of rest (built using flask) and graphql (built using express.js) APIs for prediction and authentication. The logistic regression model has an accuracy of 80.3%, meaning that it predicts results accurately 80% of the time. 


## Authors

- [Jan Rodel Escareses](https://www.github.com/jescares)
- [Thuan An Quan](https://www.github.com/AnsonQuan)
- [Dahye Lee](https://www.github.com/dahye213)
- [Nanjin Wang](https://www.github.com/nwang45)
- [Irin Cibi](https://www.github.com/icibi)


## How to Run

Prerequisites: Python, MongoDB, Node.js

In Visual Studio Code, right click the login-server and client folders and select "Open in Tntegrated Terminal". 

Install the required modules by typing "npm i" or "npm install" (Requires Node.js).

Once the modules have been installed, you can now run the login-server by typing "npm start" (Requires MongoDB daemon to connect to server).

For the server folder, click the "run" button on the top right corner of the Visual Studio Code page.

To run the client, install the required dependencies in the frontend folder and run it with the same commands as earlier.