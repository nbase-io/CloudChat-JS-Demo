import * as ncloudchat from "cloudchat";
// import * as ncloudchat from "../../cloudchat-sdk-javascript/src";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { IUser } from "./lib/interfaces/IUser";
import { IFriendship } from "./lib/interfaces/IFriendship";
import { IChannel } from "./lib/interfaces/IChannel";
import { ICountUnread } from "./lib/interfaces/ICountUnread";
import { ICreateSubscription } from "./lib/interfaces/ICreateSubscription";
import { ICreateChannel } from "./lib/interfaces/ICreateChannel";

const PROJECT_ID = "339c2b1c-d35b-47f2-828d-5f02a130146a";

// initialize
export const nc = new ncloudchat.Chat(true);
nc.initialize(PROJECT_ID);
nc.setLang("en");
nc.setServerUrl("https://alpha-dashboard-api.cloudchat.dev");
nc.setSocketUrl("https://alpha-soc.cloudchat.dev:3000");

// connect
export const useConnect = () =>
  useQuery<IUser>(
    ["connect"],
    async () =>
      await nc.connect(
        {
          id: "guest",
          name: "Guest",
          profile: "",
          customField: "",
        },
        ""
      ),
    { suspense: true }
  );

// getFriendships
export const useGetFriendships = (enabled: boolean) =>
  useQuery<IFriendship[]>(
    ["friendships"],
    async () => {
      const filter = { status: "accepted" };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      return await nc.getFriendships(filter, sort, option);
    },
    { enabled: enabled, suspense: true }
  );

// getChannels
export const useGetChannels = (enabled: boolean) =>
  useQuery<IChannel[]>(
    ["channels"],
    async () => {
      const filter = { state: true };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      return await nc.getChannels(filter, sort, option);
    },
    { enabled: enabled, suspense: true }
  );

// getMessages using infitite query as an example
// export const useGetMessages = (
//   enabled: boolean,
//   channel_id: string | undefined
// ) =>
//   useInfiniteQuery(
//     [`messages`, { channelId: channel_id }],
//     async ({ pageParam = 0 }) => {
//       if (channel_id) {
//         const filter = { channel_id: channel_id };
//         const sort = { created_at: -1 };
//         const option = { offset: pageParam, per_page: 25 };
//         return await nc.getMessages(filter, sort, option);
//       }
//     },
//     {
//       enabled: enabled,
//       getNextPageParam: (lastPage, allPage: any[]) => {
//         const nextPage = allPage.length * 25;
//         var currentLength = 0;
//         allPage.map((page) => {
//           console.log();
//           return (currentLength += page.edges.length);
//         });
//         return currentLength < lastPage.totalCount ? nextPage : undefined;
//       },
//     }
//   );

// getChannel
export const useGetChannel = (
  enabled: boolean,
  channel_id: string | undefined
) =>
  useQuery<IChannel>(
    ["channel"],
    async () => {
      if (channel_id) {
        return await nc.getChannel(channel_id);
      }
    },
    {
      enabled: enabled,
    }
  );

// countUnread
export const useCountUnread = (
  enabled: boolean,
  channel_id: string | undefined
) =>
  useQuery<ICountUnread>(
    [`countUnread`, { channelId: channel_id }],
    async () => {
      if (channel_id) {
        return await nc.countUnread(channel_id);
      }
    },
    {
      enabled: enabled,
    }
  );

// subscribe
export const useSubscribe = (
  enabled: boolean,
  channel_id: string | undefined
) =>
  useQuery<ICreateSubscription>(
    [`subscribe`, { channelId: channel_id }],
    async () => {
      if (channel_id) {
        return await nc.subscribe(channel_id);
      }
    },
    { enabled: enabled }
  );

// getSubscriptions
export const useGetSubscriptions = (
  enabled: boolean,
  channel_id: string | undefined
) =>
  useQuery<any>(
    [`subscriptions`, { channelId: channel_id }],
    async () => {
      if (channel_id) {
        const filter = { channel_id: channel_id };
        const sort = { created_at: -1 };
        const option = { offset: 0, per_page: 100 };
        return await nc.getSubscriptions(filter, sort, option);
      }
    },
    { enabled: enabled }
  );

// sendMessage
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

// sendImage
export const useSendImage = (channel_id: string, file: any) =>
  useMutation(async () => await nc.sendImage(channel_id, file));

// deleteMessage
export const useDeleteMessage = (channel_id: string, message_id: string) =>
  useMutation(async () => await nc.deleteMessage(channel_id, message_id));

// markRead
export const useMarkRead = (
  channel_id: string,
  message_id: string,
  user_id: string,
  sort_id: string
) =>
  useMutation(async () => {
    console.log(channel_id, message_id, user_id, sort_id);
    return await nc.markRead(channel_id, { user_id, message_id, sort_id });
  });

// create channel
// export const useCreateChannel = (
//   type: string,
//   name: string,
//   image_url: string
// ) =>
//   useMutation(
//     async () => {
//       console.log(type, name, image_url);
//       return await nc.createChannel({
//         type: type,
//         name: name,
//         imageUrl: image_url,
//       });
//     },
//     {
//       onMutate: () => console.log("mutating"),
//       onSuccess: () => console.log("mutate success"),
//       onError: () => console.log("mutate error"),
//     }
//   );
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
