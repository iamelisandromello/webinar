export interface SignIn {
  sigin: (params: SignIn.Params) => Promise<SignIn.Result>
}

export namespace SignIn {
  export type Result = boolean
  export type Params = {
    user: string,
    password: string
  }
}
