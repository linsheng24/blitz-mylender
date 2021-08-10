import { atom } from "recoil"

export const ShowLoginForm = atom({
  key: "SHOW_LOGIN_FORM",
  default: false,
})

export const ShowSignupForm = atom({
  key: "SHOW_SIGNUP_FORM",
  default: false,
})
