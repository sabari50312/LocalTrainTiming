# Local-Train-Timing

API for fetching local train timings 

## Currently includes timings for
- Chennai
- (More citites will be added soon)

## Running it on your local machine
#### Requirements:
- [NodeJS](https://nodejs.org/en/) >= v20.2.0
#### 1. Clone the repository
```
$ git clone https://github.com/sabari50312/LocalTrainTiming.git 
```
Or download and extract zip
#### 2. Install dependencies:
```
$ npm install
```
#### 3. Start the server
```
$ npm start
```

## API Reference
- GET train timings from ```fromStation``` to ```toStation``` during ```time``` (weekdays/sunday)
```html
http://localhost:3000/fromStation/toStation/time
```

## Examples
- GET timings from Potheri to Tambaram during Sundays
```html
http://localhost:3000/Potheri/Tambaram/Sunday
```
