# Ncloud Chat Demo
## Standard Chat ([demo](https://ncloudchat-staging.vercel.app/))
## Live Stream ([demo](https://cloudchat-livestream.vercel.app/))

---
## Updates
### 01-22-2023 
1. add live stream
2. add reply message
3. add on message delete
4. add user list view (live stream)
5. add mobile view (standard chat)

### 03-02-2023
1. add mobile view (live stream)
2. add chat view toggle (live stream)

### 03-03-2023
1. add global error handling
2. clean up codes
3. add comments
   
---
## Backgound
Standard Chat and Live Stream demo. apps are developed to show how to use the 
Ncloud Chat JS SDK [^1] with React in TypeScript. 

[^1]: Ncloud Chat is a service where you can implement real-time chats, message system, and multi-user chat channels. Various SDKs and APIs are provided, so you can build a chat service easily and simply.
With the Ncloud Chat service of NAVER Cloud Platform, you don't have to develop log-in environment or operation tools, and there's no need to build a separate system for infrastructure and user management. You can analyze statistics and run and manage your service from the intuitive and convenient Ncloud Chat dashboard. Linkage with various services in NAVER Cloud Platform allows you to build a robust chat environment.

## Technologies
 - Vite
 - React
 - TypeScript
 - React Query
 - Chakra UI
 - Ncloud Chat

## Features
### Standard Chat
 - Create Channel
 - Edit Channel
 - Delete Channel
 - Join Channel
 - Leave Channel
 - Send Message
 - Send Image
 - Reply Message
 - Reply Image
 - Copy Message
### Live Stream
 - Send Message
 - Send Image
 - Reply Message
 - Reply Image
 - Copy Message
---
## Implementation
### connect
### getChannels
### subscribe
### unsubscribe
### getSubscriptions
### getMessages
### sendMessage
### sendImage
### deleteMessage
### createChannel
### deleteChannel
### onMessageReceived
### onMessageDeleted
### onMemberJoined
### onMemberLeft