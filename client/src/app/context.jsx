import { createContext } from "react";

export const initial = {
  buttonsHeight: 0,
  chat: {
    user: null,
    lastRequest: null,
    buttons: [],
    messages: [],
    inlineButtons: []
  },
  setChat: (data) => {},
  setButtonsHeight: (height) => {}
};

const ChatContext = createContext(initial);

export default ChatContext;
