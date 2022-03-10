export interface SignIn {
  sigin: (params: SignIn.Params) => Promise<SignIn.Result>
}

export namespace SignIn {
  export type Result = boolean | null
  export type Params = {
    user: string,
    password: string
  }
}
