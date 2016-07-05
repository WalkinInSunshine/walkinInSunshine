[![Build Status](https://travis-ci.org/KMSkelton/walkinInSunshine.svg?branch=serverForecast)](https://travis-ci.org/KMSkelton/walkinInSunshine)

# walkinInSunshine
... is a MEAN stack app for planning hikes using an interactive map, trail info, and weather data. It has the ability to save trail data on a user's secure profile.

## Create a secure user profile (or not)!
Signing up is easy and secure! Just enter an email and the password you
would like to use and that's it!  If that email is already in use, you'll
need to use another one (or use the default view). The default view allows you to use the site without access to bonus features like saving your favorite trails, your normal starting location, and your preferred driving radius.

## Sign in!
Signing in is easy too! It works exactly how you'd think it would!  Enter your email and password -- if it matches what's in the database, you'll be logged in and whisked away to the main page where you'll have access to the full app!

## Create a customized profile!
Just select the profile button and you'll be able to create a list of your favorite trails! Select all the trails you'd like from the full list, and when you're ready, hit the button! The new trails will be added to your collection! It's that easy! Instead of having your map view cluttered with all the trails in the database, your view just includes your favorites.

## Trail Model
Options for saving your own custom trails include:

* Trail Name
* Latitude
* Longitude
* Difficulty
* Trail length
* Average time to complete hike

### Cloning the app
Fork this repo and clone it on your machine:
```bash
> git clone https://github.com/WalkinInSunshine/walkinInSunshine
```

## Navigate to project directory
Type this:
```bash
> cd walkinInSunshine
```

## Install packages
```bash
> npm install
```

## Start mongodb
```bash
> export MONGO_URI="mongodb://localhost/db"
> mongod --dbpath=./api_server/db
```

## Run tests
Open a second terminal window, navigate to the project directory, and type:
```bash
> gulp
```

## Set your app secret
```bash
> export APP_SECRET="appsecret"
```

## Authors

Written by
[Brandon Parker](https://github.com/Brandon-Parker),
[Gene Troy](https://github.com/energene), and
[Kris Skelton](https://github.com/kmskelton).


## Acknowledgements
Thanks to Forecast.io and Google Maps, we have high quality data and excellent data visualization in our project.

## License

The project is licensed under the terms of the MIT license.
