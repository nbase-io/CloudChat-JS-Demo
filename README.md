# Ncloud Chat Demo
### Standard Chat ([demo](https://standardchat.ncloudchat.com/))
### Live Stream ([demo](https://livestream.ncloudchat.com/))

## Updates
#### 01-22-2023 
1. add live stream
2. add reply message
3. add on message delete
4. add user list view (live stream)
5. add mobile view (standard chat)

#### 03-02-2023
1. add mobile view (live stream)
2. add chat view toggle (live stream)

#### 03-03-2023
1. add global error handling
2. clean up codes
3. add comments
4. add MIT license

#### 03-08-2023
1. add ncloud chat document link button
2. add npm link buttn
3. add Google Analytics
4. getChannels only fetch public
5. wider message bubble width
6. add sendIntegration (chatGPT, Papago translation)
   
## Backgound
[Standard Chat](https://standardchat.ncloudchat.com/) and [Live Stream](https://livestream.ncloudchat.com/) demo. apps are developed to show how to use the 
[Ncloud Chat](https://guide.ncloud-docs.com/docs/bizapp-ncloudchat-javascriptsdk) [^1] JS SDK  with [React](https://reactjs.org/docs/getting-started.html) in [TypeScript](https://www.typescriptlang.org/). 

[^1]: Ncloud Chat is a service where you can implement real-time chats, message system, and multi-user chat channels. Various SDKs and APIs are provided, so you can build a chat service easily and simply.
With the Ncloud Chat service of NAVER Cloud Platform, you don't have to develop log-in environment or operation tools, and there's no need to build a separate system for infrastructure and user management. You can analyze statistics and run and manage your service from the intuitive and convenient Ncloud Chat dashboard. Linkage with various services in NAVER Cloud Platform allows you to build a robust chat environment.

## Technologies
 - [Vite](https://vitejs.dev/guide/)
 - [React](https://reactjs.org/docs/getting-started.html)
 - [TypeScript](https://www.typescriptlang.org/)
 - [React Query](https://react-query-v3.tanstack.com/overview)
 - [Chakra UI](https://chakra-ui.com/getting-started)
 - [Ncloud Chat](https://guide.ncloud-docs.com/docs/bizapp-ncloudchat-javascriptsdk)

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
  
## Implementation ([TypeScript](https://www.typescriptlang.org/))
React query was mainly used to take care of most of the API calls. getMessages did not use react-query for educational purpose but there are one that is commented to show how to implement getMessages using react-query.

### **initialize**
To initialize ncloudchat, you need to input your own project ID. Using setLang(),
you can set default lanugage of the server. Server messages will be delievered 
in set language. Server and Socket URL need to be set. Default URLs are:
- Server URL: https://alpha-dashboard-api.cloudchat.dev
- Socket URL: https://alpha-soc.cloudchat.dev:3000

You may need different URLs if you use the project in different country other
than South Korea and United States.
```typescript
import * as ncloudchat from "cloudchat";

export const nc = new ncloudchat.Chat();

// initialize
nc.initialize(projectId);
nc.setLang("en"); // language setting
// below is the default urls that can be only used in South Korea 
nc.setServerUrl("https://alpha-dashboard-api.cloudchat.dev");
nc.setSocketUrl("https://alpha-soc.cloudchat.dev:3000");
```

### **connect**
Connect is implemented using react-hook-form to use the validation. It is also 
using useMutation from react-query.
```typescript
// api.ts
export const connect = async ({
  name,
  id,
  profile,
  server,
  projectId,
}: ILogin) => {
  return await nc.connect({
    id: id,
    name: name,
    profile: profile,
    customField: "",
  });
};
```
```typescript
// LoginModal.tsx
import { connect } from "../../api";

// using useMuatation from react-query
const mutation = useMutation<any, any, ILogin>(connect, {
    onSuccess: (data) => {
      toast.success(`Hello, ${data?.name}`);
      setUser(data);
      onModalClose();
      reset();
    },
    onError: (error) => {
      setIsLoading(false);
    },
    mutationKey: ["connect"],
  });

// using validation from react-hook-form
const onSubmit = (data: ILogin) => {
  setIsLoading(true);
  mutation.mutate(data); // trigger connect
};
// <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
```
### **getChannels**
getChannels will be fired only if there is a user. User is set after connect 
(see "setUser" from connect above). For more than 100 channels, you will need 
a pagination. 
```typescript
// api.ts
export const useGetChannels = (enabled: boolean) =>
  useQuery<IChannel[]>(
    ["channels"],
    async () => {
      const filter = { state: true };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      return await nc.getChannels(filter, sort, option);
    },
    { enabled: enabled } // enabled will be user.id
  );
```
```typescript
// StandardChat.tsx
const { user, setIsLoading } = useGlobal(); // user is set after connect
const {
  data: channels,
  isLoading: isGettingChannels,
  status: getChannelsStatus,
} = useGetChannels(!!user?.id); // once user is set, get channels
```
### **subscribe**
To get the channel messages, you need to be subscribed to a channel. Once you
select a channel from the channels list, it subscribes to the channel (User
needs permission by channel owner if the channel type is private). 
```typescript
// api.ts
export const useSubscribe = (
  enabled: boolean,
  channel_id: string | undefined
) =>
  useQuery<ICreateSubscription, any>(
    [`subscribe`, { channelId: channel_id }],
    async () => {
      if (channel_id) {
        return await nc.subscribe(channel_id);
      }
    },
    {
      enabled: enabled, // enabled will be a channel
    }
  );
```
```typescript
// StandardChat.tsx
const { data: subscription, error: subscribeError } = useSubscribe(
  !!channel,
  channel?.id
); // subscribe when channel state exists (channel is selected)
```
### **unsubscribe**
Below shows how to leave a channel.
```typescript
// api.ts
export const useUnsubscribe = (channel_id: string) =>
  useMutation(async () => await nc.unsubscribe(channel_id));
```
```typescript
// ChatHeader.tsx
const { mutate: unsubscribe, status: unsubscribeStatus } = useUnsubscribe(
  channel.id
);
// <MenuItem onClick={() => unsubscribe()}>
```
### **getSubscriptions**
It will be fired only once channel is selected. It has a count of how many people
are subscribing (and online by adding "online: true" to the filter) to a channel.
```typescript
// api.ts
export const useGetSubscriptions = (
  enabled: boolean,
  channel_id: string | undefined
) =>
  useQuery<any>(
    [`subscriptions`, { channelId: channel_id }],
    async () => {
      if (channel_id) {
        const filter = { channel_id: channel_id }; // online: true 
        const sort = { created_at: -1 };
        const option = { offset: 0, per_page: 100 };
        return await nc.getSubscriptions(filter, sort, option);
      }
    },
    { enabled: enabled } // enabled will be a channel
  );
```
```typescript
// ChatDetail.tsx
const { data: subscriptions } = useGetSubscriptions(
  !!subscription,
  channel?.id
); // getSubscriptions after subscribe
```
### **getMessages**
getMessages might need infinite scrolling. React-query provides useInfiniteQuery
to make simple pagination. In this demo, we used plain way as a guide but we do 
have an example that uses the useInfiniteQuery.
#### *Example using useState:*
```typescript
// Chat.tsx
// using state instead of react query for educational purpose
const [messages, setMessages] = useState<any>([]);
const [isGettingMessages, setIsGettingMessages] = useState(false);
const hasMore = useRef(false);

const getMessages = async () => {
  setIsGettingMessages(true);
  try {
    const filter = { channel_id: channel.id };
    const sort = { sort_id: -1 };
    const option = { offset: messages.length, per_page: 25 };
    const response = await nc.getMessages(filter, sort, option);
    const newMessages = messages.concat(response.edges);
    setMessages(newMessages);
    hasMore.current = messages.length + response.edges.length < response.totalCount;
  } catch (error) {
    console.log(error);
  }
  setIsGettingMessages(false);
};

useEffect(() => {
  // getMessages if messages are cleared (channel changed)
  if (hasMore.current && messages.length === 0 && subscription) {
    getMessages(); 
  }
}, [messages]); 
```
#### *Example using useInfiniteQuery:*
```typescript
// api.ts
export const useGetMessages = (
  enabled: boolean,
  channel_id: string | undefined
) =>
  useInfiniteQuery(
    [`messages`, { channelId: channel_id }],
    async ({ pageParam = 0 }) => {
      if (channel_id) {
        const filter = { channel_id: channel_id };
        const sort = { created_at: -1 };
        const option = { offset: pageParam, per_page: 25 };
        return await nc.getMessages(filter, sort, option);
      }
    },
    {
      enabled: enabled,
      getNextPageParam: (lastPage, allPage: any[]) => {
        const nextPage = allPage.length * 25;
        var currentLength = 0;
        allPage.map((page) => {
          return (currentLength += page.edges.length);
        });
        return currentLength < lastPage.totalCount ? nextPage : undefined;
      },
    }
  );
```
### **sendMessage**
If you add a parent message ID, the message becomes a reply to the parent message.
```typescript
// api.ts
export const useSendMessage = (
  channel_id: string,
  message: string,
  parent_message_id: string | null
) => {
  return useMutation(
    async () =>
      await nc.sendMessage(channel_id, {
        type: "text",
        message: message,
        parent_message_id: parent_message_id,
      })
  );
};
```
```typescript
// ChatInput.tsx
const [input, setInput] = useState<any>("");
const { mutate: sendMessage } = useSendMessage(
  channel.id,
  input,
  replyParentMessage?.message_id
);
const sendText = (e: any) => {
  e.preventDefault();
  if (input) {
    // send message
    sendMessage(channel.id, input);
  }
  setInput(""); // clear input
  setReplyParentMessage(null); // clear parent message
};
// <FormControl as={"form"} onSubmit={sendText}>
```
### **sendImage**
Please make sure to set allowed image file type from your project setting on the
dashboard.
```typescript
// api.ts
export const useSendImage = (channel_id: string, file: any) =>
  useMutation(async () => await nc.sendImage(channel_id, file));
```
### **deleteMessage**
Only a user who owns the message (who sent the message) can delete the message.
```typescript
// api.ts
export const useDeleteMessage = (channel_id: string, message_id: string) =>
  useMutation(async () => await nc.deleteMessage(channel_id, message_id));
```
### **createChannel**
```typescript
// api.ts
export const createChannel = async ({
  type,
  name,
  image_url,
}: ICreateChannel) =>
  await nc.createChannel({
    type: type,
    name: name,
    imageUrl: image_url,
  });
```
### **deleteChannel**
Only a user who owns the chennel (who created the channel) can delete the channel.
```typescript
// api.ts
export const useDeleteChannel = (channel_id: string) =>
  useMutation(async () => await nc.deleteChannel(channel_id));
```
### **updateChannel**
Only a user who owns the chennel (who created the channel) can update the channel.
```typescript
// api.ts
export const updateChannel = async ({
  channel_id,
  type,
  name,
  image_url,
}: IUpdateChannel) => {
  return await nc.updateChannel(channel_id, {
    type: type,
    name: name,
    imageUrl: image_url,
  });
};
```
### **onMessageReceived**
```typescript
// Chat.tsx
nc.bind("onMessageReceived", (channelId: string, message: any) => {
  if (channel.id === channelId) {
    setArrivalMessage({ node: message });
  }
});

useEffect(() => {
  setMessages((prev: any) => [arrivalMessage, ...prev]);
}, [arrivalMessage]);
```
### **onMessageDeleted**
```typescript
// Chat.tsx
nc.bind("onMessageDeleted", (channelId: string, data: any) => {
  if (channel.id === channelId) {
    toast.success(`A message has been deleted!`);
    // delete message
    const newMessages = messages.filter(
    (item: any) => item.node.message_id !== data.message_id);
    setMessages(newMessages); // setMessages excluding deleted message
  }
});
```
### **onMemberJoined**
```typescript
// Chat.tsx
nc.bind("onMemberJoined", (data: any) => {
  if (channel.id === data.channel_id) {
    toast(`${data.user_id} joined ${channel.name}`);
    queryClient.invalidateQueries([
    "subscriptions",
    { channelId: channel.id },
    ]); // will refetch getSubscriptions
  }
});
```
### **onMemberLeft**
```typescript
// Chat.tsx
nc.bind("onMemberLeft", (data: any) => {
  if (channel.id === data.channel_id) {
    toast(`${data.user_id} left ${channel.name}`);
    queryClient.invalidateQueries([
    "subscriptions",
    { channelId: channel.id },
    ]); // will refetch getSubscriptions
  }
});
```
## Getting Help
Please see our [official document guide](https://guide.ncloud-docs.com/docs/bizapp-ncloudchat-javascriptsdk) for more information about the NcloudChat JS SDK.
