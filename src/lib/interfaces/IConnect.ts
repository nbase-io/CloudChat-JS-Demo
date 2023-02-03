interface IToken {
  token: string;
}

interface ILogin {
  login: IToken;
}

export interface IConnect {
  data: ILogin;
}
