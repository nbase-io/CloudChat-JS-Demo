import * as ncloudchat from "NCloudChat";
// import * as ncloudchat from "../../../cloudchat-sdk-javascript/src";

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { ICreateSubscription } from "./lib/interfaces/ICreateSubscription";
import { ILogin } from "./lib/interfaces/ILogin";

export const nc = new ncloudchat.Chat(true);

interface SendMessageData {
  channel_id: string;
  message: string;
  parent_message_id: string | null;
}

// connect
export const connect = async ({
  name,
  id,
  profile,
  server,
  projectId,
}: ILogin) => {
  // initialize
  nc.initialize(projectId);
  nc.setLang("en");
  // below is the default url that can be used in South Korea only
  // nc.setServerUrl("https://alpha-dashboard-api.cloudchat.dev");
  // nc.setSocketUrl("https://alpha-soc.cloudchat.dev:3000");

  /* This part is only for internal use, please ignore this part */
  /* ----------------------------------------------------------- */
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
  /* ----------------------------------------------------------- */

  return await nc.connect({
    id: id,
    name: name,
    profile: profile,
    customField: "",
  });
};

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
    async ({ channel_id, message, parent_message_id }: SendMessageData) =>
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
