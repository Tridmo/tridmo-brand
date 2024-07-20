"use client"

import { WyContext, useWeavy } from '@weavy/uikit-react'
import { CHAT_SERVER_URL } from '../../utils/env_vars'
import { tokenFactory } from '../../utils/chat'
import { createContext, useEffect } from 'react';
import { AppTypeGuid } from '../../types/weavy';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSelectedConversation } from '../../data/chat';
import * as svSE from '@weavy/uikit-web/dist/es/locales/sv-SE'

const WeavyContext = createContext({});

export default function WeavyProvider({ children }) {

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<any>();

  // const weavy = useWeavy({
  //   notificationEvents: true,
  //   url: CHAT_SERVER_URL,
  //   tokenFactory: tokenFactory,
  //   locales: [
  //     ["sv-SE", svSE], // Static locale, already loaded.
  //     ["ru-RU", import("../../chat_locales/locales/ru-RU")] // Async pre-loading, started instantly.
  //   ],
  //   locale: 'ru-RU'
  // })

  useEffect(() => {
    document.addEventListener("wy:link", (e: any) => {
      e.preventDefault()
      const appType = e.detail.app.type;
      const appId = e.detail.app.id;
      if (
        appType == AppTypeGuid['PrivateChat'] &&
        pathname != 'chat'
      ) {
        dispatch(setSelectedConversation(appId))
        router.push(`/chat`)
      }
    });
  }, [])

  return (
    <WeavyContext.Provider value={{}}>
      <WyContext
        notificationEvents
        url={CHAT_SERVER_URL}
        tokenFactory={tokenFactory}
        locales={[
          ["sv-SE", svSE], // Static locale, already loaded.
          ["ru-RU", import("../../chat_locales/locales/ru-RU")] // Async pre-loading, started instantly.
        ]}
        locale='ru-RU'
      />
      {children}
    </WeavyContext.Provider>
  );
}
