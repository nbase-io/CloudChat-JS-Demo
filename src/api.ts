import * as ncloudchat from "ncloudchat";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "./lib/interfaces/IUser";
import { IFriendship } from "./lib/interfaces/IFriendship";
import { IChannel } from "./lib/interfaces/IChannel";

const PROJECT_ID = "339c2b1c-d35b-47f2-828d-5f02a130146a";

// ncloudchat 초기화
const nc = new ncloudchat.Chat(true);
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
          id: "guest22",
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