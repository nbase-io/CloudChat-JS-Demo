import * as ncloudchat from "ncloudchat";

import {
  useInfiniteQuery,
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

interface SendMessageData {
  channel_id: string;
  message: string;
  parent_message_id: string | null;
}

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
      const filter = { state: true, type: "PUBLIC" };
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      return await nc.getChannels(filter, sort, option);
    },
    { enabled: enabled }
  );
// getUsers
export const useGetUsers = (enabled: boolean) =>
  useQuery<any>(
    ["users"],
    async () => {
      const filter = {};
      const sort = { created_at: -1 };
      const option = { offset: 0, per_page: 100 };
      return await nc.getUsers(filter, sort, option);
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
  useInfiniteQuery(
    [`subscriptions`, { channelId: channel_id }],
    async ({ pageParam = 0 }) => {
      if (channel_id) {
        const filter = { channel_id: channel_id };
        const sort = { created_at: -1 };
        const option = { offset: pageParam, per_page: 25 };
        return await nc.getSubscriptions(filter, sort, option);
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

// sendMessage
export const useSendMessage = () => {
  return useMutation(
    async ({ channel_id, message, parent_message_id }: SendMessageData) => {
      return await nc.sendMessage(channel_id, {
        type: "text",
        message: message,
        parent_message_id: parent_message_id,
      });
    }
  );
};

// sendIntegration (chatGPT, papago, clover, etc.)
export const useSendIntegration = (channel: any, message: string) =>
  useMutation(async () => {
    const messageContent = message.replace(/^#/, "");
    let data = null;
    switch (channel.integration_id) {
      case "chatgpt":
        data = { prompt: messageContent, model: "gpt-3.5-turbo" };
        break;
      case "clova_papago":
        data = {
          text: messageContent,
          srcLang: "auto",
          targetLang: "en,ja,vi,zh-CN,th",
        };
        break;
      case "sentiment":
        data = { content: messageContent };
        break;
      case "hyperclovax":
      case "hyperclovax002":
      case "hyperclovax003":
      case "hyperclovax004":
      case "hyperclovax005":
        data = {
          topK: 0,
          includeAiFilters: true,
          maxTokens: 300,
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content:
                "- 아래는 AI 클로바와 사용자의 대화입니다.\n- 클로바는 민감한 사회적 문제, 욕설, 위험, 폭력적인 발언을 하지 않습니다.\n",
            },
            {
              role: "user",
              content: messageContent,
            },
          ],
          stopBefore: [],
          repeatPenalty: 5.0,
          topP: 0.8,
        };
        break;
      default:
        return;
    }
    return await nc.sendIntegration(
      channel.id,
      channel.integration_id,
      "all",
      data
    );
  });

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
    return await nc.markRead(channel_id, { user_id, message_id, sort_id });
  });

// create channel
export const createChannel = async ({
  type: ChannelType,
  name,
  image_url,
}: ICreateChannel) => {
  // await nc.createChannel({
  //   type: type,
  //   name: name,
  //   imageUrl: image_url,
  // });
};

// delete channel
export const useDeleteChannel = (channel_id: string) =>
  useMutation(async () => await nc.deleteChannel(channel_id));

// update channel
export const updateChannel = async ({
  channel_id,
  name,
  image_url,
}: IUpdateChannel) => {
  // return await nc.updateChannel(channel_id, {
  //   name: name,
  //   imageUrl: image_url,
  // });
};
