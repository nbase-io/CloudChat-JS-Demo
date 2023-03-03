import * as ncloudchat from "cloudchat";
// import ncloudchat * as ncloudchat from "../../../cloudchat-sdk-javascript/src";

import {
  // useInfiniteQuery,
  useMutation,
  useQuery,
  // useQueryClient,
} from "@tanstack/react-query";

import { IFriendship } from "./lib/interfaces/IFriendship";
import {
  IChannel,
  ICreateChannel,
  IUpdateChannel,
} from "./lib/interfaces/IChannel";
import { ICountUnread } from "./lib/interfaces/ICountUnread";
import { ICreateSubscription } from "./lib/interfaces/ICreateSubscription";
import { ILogin } from "./lib/interfaces/ILogin";

// initialize
export const nc = new ncloudchat.Chat(true);

// connect
export const connect = async ({
  name,
  id,
  profile,
  server,
  projectId,
}: ILogin) => {
  nc.initialize(projectId);
  nc.setLang("en");
  switch (server) {
    case "localhost":
      nc.setServerUrl("http://localhost:4000");
      nc.setSocketUrl("http://localhost:3001");
      break;
    case "alpha":
      nc.setServerUrl("https://alpha-dashboard-api.cloudchat.dev");
      nc.setSocketUrl("https://alpha-soc.cloudchat.dev:3000");
      break;
    case "beta":
      nc.setServerUrl("https://dashboard-api.beta-ncloudchat.naverncp.com");
      nc.setSocketUrl("https://soc.beta-ncloudchat.ntruss.com");
      break;
    case "real":
      nc.setServerUrl("https://ncloudchat.apigw.ntruss.com/gpapps/v1");
      nc.setSocketUrl("https://soc.ncloudchat.ntruss.com");
      break;
    default:
      nc.setServerUrl("https://alpha-dashboard-api.cloudchat.dev");
      nc.setSocketUrl("https://alpha-soc.cloudchat.dev:3000");
  }
  return await nc.connect({
    id: id,
    name: name,
    profile: profile,
    customField: "",
  });
};

// connect using useQuery example
// export const useConnect = (
//   enabled: boolean,
//   name: string,
//   id: string,
//   profile: string,
//   server: string,
//   projectId: string
// ) =>
//   useQuery<IUser>(
//     ["connect"],
//     async () => {
//       console.log(enabled, name, id, profile, server, projectId);
//       nc.initialize(projectId);
//       nc.setLang("en");
//       switch (server) {
//         case "localhost":
//           nc.setServerUrl("http://localhost:4000");
//           nc.setSocketUrl("http://localhost:3001");
//           break;
//         case "alpha":
//           nc.setServerUrl("https://alpha-dashboard-api.cloudchat.dev");
//           nc.setSocketUrl("https://alpha-soc.cloudchat.dev:3000");
//           break;
//         case "beta":
//           nc.setServerUrl("https://dashboard-api.beta-ncloudchat.naverncp.com");
//           nc.setSocketUrl("https://soc.beta-ncloudchat.ntruss.com");
//           break;
//         case "real":
//           nc.setServerUrl("https://ncloudchat.apigw.ntruss.com/gpapps/v1");
//           nc.setSocketUrl("https://soc.ncloudchat.ntruss.com");
//           break;
//         default:
//           nc.setServerUrl("https://alpha-dashboard-api.cloudchat.dev");
//           nc.setSocketUrl("https://alpha-soc.cloudchat.dev:3000");
//       }

//       return await nc.connect(
//         {
//           id: id,
//           name: name,
//           profile: profile,
//           customField: "",
//         },
//         ""
//       );
//     },
//     { enabled: enabled, suspense: true }
//   );

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
    { enabled: enabled }
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
    { enabled: enabled }
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
  useQuery<ICreateSubscription, any>(
    [`subscribe`, { channelId: channel_id }],
    async () => {
      if (channel_id) {
        return await nc.subscribe(channel_id);
      }
    },
    {
      enabled: enabled,
    }
  );

export const useUnsubscribe = (channel_id: string) =>
  useMutation(async () => await nc.unsubscribe(channel_id));

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

// delete channel
export const useDeleteChannel = (channel_id: string) =>
  useMutation(async () => await nc.deleteChannel(channel_id));

// update channel
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
