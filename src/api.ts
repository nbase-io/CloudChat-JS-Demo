import * as ncloudchat from "ncloudchat";

const PROJECT_ID = "5fab9d91-d842-43de-878f-99386171fa22";

// ncloudchat 초기화
const nc = new ncloudchat.Chat(true);
nc.initialize(PROJECT_ID);
nc.setLang("en");

// ncloudchat 연결
export const connect = async () => {
  const response = await nc.connect(
    {
      id: "guest",
      name: "Guest",
      profile: "",
      customField: "",
    },
    ""
  );
  // console.log(response);
  return response;
};

export const getChannels = async () => await nc.getChannels({});
