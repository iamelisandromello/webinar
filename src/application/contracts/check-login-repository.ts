export interface CheckLoginRepositoryContract {
  verify: (params: CheckLoginRepositoryContract.Params) => Promise<CheckLoginRepositoryContract.Result>
}

export namespace CheckLoginRepositoryContract {
  export type Params = {
    user: string,
    password:string
  }

  export type Result = boolean
}
