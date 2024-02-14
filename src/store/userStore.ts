import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  isLogin: boolean
  token: string
}

const useUserStore = create<UserState>()(
  immer(() => ({
    isLogin: false as boolean,
    token: '',
  })),
)

export const setUserToken = (token: string) => {
  useUserStore.setState((state) => {
    state.token = token
  })
}

export default useUserStore
