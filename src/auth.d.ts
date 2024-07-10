// Declare interface, type, ...etc, which are related to the module.
export namespace AuthenticationModule {
  type State = {
    user: User | null
    lang: string | undefined
    theme: string | undefined
    returnUrl: string | null
  }

  interface User {
    id: number | string
    name: string
    email: string
    imgURL: string
  }
}
