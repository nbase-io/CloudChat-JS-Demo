import * as ncloudchat from "ncloudchat";
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
import { ISubscription } from "./lib/interfaces/ISubscription";

const PROJECT_ID = "339c2b1c-d35b-47f2-828d-5f02a130146a";

// ncloudchat 초기화
export const nc = new ncloudchat.Chat(true);
nc.initialize(PROJECT_ID);
nc.setLang("en");
nc.setServerUrl("https://alpha-dashboard-api.cloudchat.dev");
nc.setSocketUrl("https://alpha-soc.cloudchat.dev:3000");

// ncloudchat 연결
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

// ncloudchat 친구들 가져오기
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

// ncloudchat 채널들 가져오기
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

// ncloudchat 특정 채널 메세지들 가져오기
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

// ncloudchat 특정 채널 가져오기
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

// ncloudchat 안읽은 메세지 수 가져오기
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

// ncloudchat 구독
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

// ncloudchat 구독 모두 가져오기
export const useGetSubscriptions = (
  enabled: boolean,
  channel_id: string | undefined
) =>
  useQuery<ISubscription[]>(
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

export const useSendMessage = (
  channel_id: string | undefined,
  message: string
) => {
  return useMutation(
    async () =>
      await nc.sendMessage(channel_id, { type: "text", message: message })
  );
};

export const useSendImage = (channel_id: string | undefined, file: any) => {
  return useMutation(async () => await nc.sendImage(channel_id, file));
};
