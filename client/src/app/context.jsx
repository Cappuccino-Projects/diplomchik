import { createContext } from "react";

export const initial = {
  buttonsHeight: 0,
  payload: {},
  setPayload: () => {},
  chat: {
    user: null,
    lastRequest: null,
    buttons: [],
    messages: [],
    inlineButtons: []
  },
  setChat: () => {},
  setButtonsHeight: () => {}
};

const ChatContext = createContext(initial);

export default ChatContext;
