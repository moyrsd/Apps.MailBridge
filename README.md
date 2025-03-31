<div align="center">
<img width=40% src="https://github.com/user-attachments/assets/a92f27b9-5101-4725-8311-a0e6ada0edc7" alt="rocket-chat">
</div>

<div align="center">

# MailBridge with Rocket.Chat
</div>
<br />
<div align="center">
  <img width=20% src="https://github.com/moyrsd/Apps.MailBridge/blob/6b83c77dc41005764857ddde0fc78f72c739c2fb/App/icon.png" alt="mailbridge icon">
  <h3 align="center">MailBrige Feature for RocketChat</h3>

  <p align="center">
    <a href="https://youtu.be/SS5uC903VAM">View Demo</a>
    ·
    <a href="https://github.com/moyrsd/Apps.MailBridge/issues">Report Bug</a>
    ·
    <a href="https://github.com/moyrsd/Apps.MailBridge/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

##  About The Project:

```

Messaging systems such as Rocket.Chat were supposed to be replacing legacy email for communications and collaboration
since the early nineteen nineties. But even after three decades of evolution and struggle, half the world still hangs
onto legacy email worldwide despite most have grown up with SMS and asynchronous messaging.

This project bridges the great divide most naturally with a Rocket.Chat App that responds to natural language
instructions and brings thelegacy email world right into every Rocket.Chat conversation for every user.

```


## 📜 Getting Started

### Prerequisites

-   You need a Rocket.Chat Server Setup
-   Rocket.Chat.Apps CLI,

*   In case you don't have run:
    ```sh
    npm install -g @rocket.chat/apps-cli
    ```

### ⚙️ Installation

-   Every RocketChat Apps runs on RocketChat Server, thus everytime you wanna test you need to deploy the app with this note. lets start setting up:

1. Clone the repo
    ```sh
    git clone https://github.com/<yourusername>/Apps.MailBridge
    ```
2. Install NPM packages
    ```sh
    npm ci
    ```
3. Deploy app using:

    ```sh
    rc-apps deploy --url <url> --username <username> --password <password>
    ```
4. Now in your rocketchat server fill the Api url , model name and apikey
5. For Google Cloud Console Credentials follow this tutorial : [Youtubelink](https://www.youtube.com/watch?v=D8DMj2lQMwo)
   - For Authorized JavaScript origins put your server url or `http://localhost:3000` if running locally
   - For Authorized redirect URI put
     `http://${serverurl}/api/apps/public/7e8a7a3b-2653-4731-9541-45c51ab3582c/google-callback `
    

## :rocket: Usage :

👋 Need some help with /mailbridge 

-   **`/mailbridge hello`**: To check if the llm is properly setup
-   **`/mailbridge mail samplemail@gmail.com`**: It will summerize all the messages in the thread and will send to samplemail@gmail.com
-   **`/mailbridge auth`**: Authneticates the user 
-   **`/mailbridge auth revoke`**: Removes the authentication token from our app



<!-- CONTRIBUTING -->

## 🧑‍💻 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: adds some amazing feature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request
6. 
## Code Architecture
```
MailBridgeApp.ts
src/
├── actions/
│   ├── HandleAuth.ts
│   ├── HandleMail.ts
│   ├── HelloWorld.ts
├── commands/
│   └── MailBridgeCommand.ts
├── prompts/
│   ├── CreateEmailPrompt.ts
├── helpers/
│   ├── LLMRequest.ts
│   ├── GetMessages.ts
│   └── NotifyMessage.ts
├── services/
│   ├── ReadMail.ts
│   ├── SendMail.ts
│   └── OAuth2Service.ts
└── settings/
    └── Settings.ts
```
## State Diagram

  <img  src="https://github.com/moyrsd/Apps.MailBridge/blob/6b83c77dc41005764857ddde0fc78f72c739c2fb/Assets/MailBridgeStateDiagram.jpg" alt="state diagram" width="100%">






## 📚 Resources

Here are some links to examples and documentation:
-   [Get gmail api]( https://developers.google.com/gmail/api/guides)
-   [Postman GMAIL API documentation](https://www.postman.com/api-evangelist/google/documentation/sauwwob/gmail-api)
-   [Rocket.Chat Apps TypeScript Definitions Documentation](https://rocketchat.github.io/Rocket.Chat.Apps-engine/)
-   [Rocket.Chat Apps TypeScript Definitions Repository](https://github.com/RocketChat/Rocket.Chat.Apps-engine)
-   [Example Rocket.Chat Apps](https://github.com/graywolf336/RocketChatApps)
-   [DemoApp](https://github.com/RocketChat/Rocket.Chat.Demo.App)
-   [GithubApp](https://github.com/RocketChat/Apps.Github22)
-   Community Forums
    -   [App Requests](https://forums.rocket.chat/c/rocket-chat-apps/requests)
    -   [App Guides](https://forums.rocket.chat/c/rocket-chat-apps/guides)
    -   [Top View of Both Categories](https://forums.rocket.chat/c/rocket-chat-apps)
-   [#rocketchat-apps on Open.Rocket.Chat](https://open.rocket.chat/channel/rocketchat-apps)


## Tasks 
- ✅ Hello World - To see if the environent is setup properly and everything is working
- ✅ HTTP api request to the LLM model is working perfectly
- ✅ Get messages from rooom and write a prompt to form a mail
- ✅ GMAIL api is working perfectly (Implement Google Oauth)
- ✅ Send that mail using Gmail Api
- ✅ Instead of hardcoding credentials create a settings menu to input them
- Read mails
- Connect everything and it should work
- Optimise code, write clean code
- write more prompts
Test after each step of the task.

### Resources

