# A proof of concept for webapp desktop and mobile push notifications
This is an Angular Spring Boot application that utilises Firebase Cloud Messaging (FCM) for sending push notifications.  
Based on the YouTube tutorial: https://youtu.be/vCDKGntFBzc?si=Y55izh5F9ISoeXxG

## Getting Started

### Create a Firebase project
1. Go to [Firebase console](https://console.firebase.google.com/u/0/) and create a project.
2. Add an app in the newly created project, selecting Web as platform.
3. Follow the set up instructions, and copy down the firebaseConfig parameters which will be used later.
4. Go to Project settings -> Service accounts -> generate new private key
5. A file will be downloaded, copy down the file contents which will be used later.

### Frontend

1. Install dependencies:
   ```bash
   npm install
   
2. Configure the FCM server connection:
   *  Open the src/environments/environment.ts and src/firebase-messaging-sw.js files and replace the relevant contents using your copied firebaseConfig parameters.
   
3. Run the application:
   * cd to fcm-client folder, then run the following command: <br>
   
    ```bash
    ng serve --disable-host-check

### Backend

1. Configure your Firebase project:
   * Create a file named google-services.json and place it in the src/main/resources directory.
   * Paste the contents copied from 'Create a Firebase project' section, part 5

2. Build the application:
   * cd to fcm-server folder, then run the following commands: <br>
   
   ```bash
   ./mvnw clean install -DskipTests

3. Run the application:

   ```bash
   java -jar target/your-fcm-server.jar

## Testing Push Notifications  

### To test push notifications over HTTPS

1. Install ngrok, follow the set-up guide below.
   * [ngrok guide](https://ngrok.com/docs/getting-started/) <br>

2. Start ngrok, proxy to the frontend that are currently running on your local machine.

    ```bash
   ngrok http http://localhost:4200

3. Copy and paste the forwarding URL in any desktop or mobile browser, if prompted, click allow notifications. Note: must allow notifications!
4. A device token will then appear on screen. Copy and paste the device token into the deviceToken field of the JSON file (in the following section) used to test the POST requests.
5. Note: on IOS, need to add the webpage bookmark to homescreen, then click on the button on webpage to allow notifications. Only then the device token will appear.


### **Endpoints**
#### Note: Can use [Postman](https://www.postman.com/downloads/) to send the requests.

### **1\. Send Notification to Device**

Endpoint: `POST /api/v1/notifications/send-to-device`

Example Request:

```json
{
  "title": "Notification Title",
  "body": "Notification Message",
  "imageUrl": "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA",
  "deviceToken": "",
  "data": {
      "key1": "value1",
      "key2": "value2"
  }
}
```

### **2\. Send Notification to Topic**

Endpoint: `POST /api/v1/notifications/send-to-topic`

Example Request:

```json
{
    "title": "Topic Title",
    "body": "Topic Message",
    "topicName": "worldCup",
    "imageUrl": "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA",
    "data": {
        "key1": "value1",
        "key2": "value2"
    }
}
```

### **3\. Send Notification to All Devices**

Endpoint: `POST /api/v1/notifications/send-to-all`

Example Request:

```json
{
    "title": "Notification Title",
    "body": "Notification Message",
    "imageUrl": "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1679921049/Image_URL_header/Image_URL_header-png?_i=AA",
    "deviceTokenList": [], 
    "data": {
        "key1": "value1",
        "key2": "value2"
    }
}
```

### **4\. Subscribe to Topic**

Endpoint: `POST /api/v1/notifications/subscribe`

Example Request:

```json
{
  "deviceToken": "",
  "topicName": "worldCup"
}
```

### **5\. Unsubscribe from Topic**

Endpoint: `POST /api/v1/notifications/unsubscribe`

Example Request:

```json
{
  "deviceToken": "",
  "topicName": "worldCup"
}
```

### **Error Handling**

* If a request fails, the server will respond with an appropriate HTTP status code and an error message in the response body.

