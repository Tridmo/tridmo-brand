"use client"

import { useWeavy, Weavy, WyContext } from '@weavy/uikit-react'
import { CHAT_SERVER_URL } from '../../utils/env_vars'
import { tokenFactory } from '../../utils/chat'
import { createContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppTypeGuid } from '../../types/weavy';
import { getChatUnread, setSelectedConversation } from '../../data/chat';
import { selectMyProfile } from '../../data/me';
import Cookies from 'js-cookie';
import { setChatToken } from '../../utils/axios';
import * as ruRU from '../../chat_locales/locales/ru-RU'

export default function WeavyProvider({ children }) {

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const profile = useSelector(selectMyProfile);
  const chatUnreadStatus = useSelector((state: any) => state?.chat?.unread_status);

  // useEffect(() => {
  //   if (profile) {
  //     const weavy = new Weavy()

  //     weavy.url = CHAT_SERVER_URL
  //     weavy.tokenFactory = tokenFactory
  //     weavy.notificationEvents = true
  //     weavy['notificationToasts'] = true

  //     console.log(weavy?.locales.length)
  //     weavy?.locales.forEach(e => console.log(e))

  //     if (weavy?.locales?.length < 2) {
  //       weavy.locales.push(["ru-RU", ruRU])
  //       weavy.locale = 'ru-RU'
  //     }
  //     weavy.locale = 'ru-RU'
  //   }
  // }, [profile])


  useEffect(() => {
    const handleWyLink = (e) => {
      e.preventDefault();
      const appType = e.detail.app.type;
      const appId = e.detail.app.id;
      if (appType === AppTypeGuid['PrivateChat'] && pathname !== 'chat') {
        dispatch(setSelectedConversation(appId));
        router.push(`/chat`);
      }
    };

    const handleWyNotifications = () => {
      dispatch(getChatUnread());
    };

    document.addEventListener('wy:link', handleWyLink);
    document.addEventListener('wy:notifications', handleWyNotifications);

    return () => {
      document.removeEventListener('wy:link', handleWyLink);
      document.removeEventListener('wy:notifications', handleWyNotifications);
    };
  }, []);

  useEffect(() => {
    if (Cookies.get('chatToken') && profile) {
      if (chatUnreadStatus === 'idle') {
        setChatToken(Cookies.get('chatToken'));
        dispatch(getChatUnread());
      }
    }
  }, [profile, Cookies.get('chatToken'), chatUnreadStatus, dispatch]);

  return (
    <>
      {!!profile && (
        <WyContext
          url={CHAT_SERVER_URL}
          tokenFactory={tokenFactory}
          locales={[
            ["ru-RU", ruRU] // Async pre-loading, started instantly.
          ]}
          locale='ru-RU'
          notificationEvents
          notificationToasts
        />
      )}
      {children}
    </>
  );
}
