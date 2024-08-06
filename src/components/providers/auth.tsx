import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../../data/login";
import { getUpdatedAccessToken } from '../../data/re-update_access_token'
// import Cookies from 'js-cookie'
import Cookies from 'js-cookie'
const AuthContext = createContext({});
import { getMyProfile, selectMyProfile } from '../../data/me';
import { setAuthToken } from "../../utils/axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import useHash from "../hooks/use_hash";

import { resetMyProfile } from '../../data/get_profile'
import { toast } from 'react-toastify'
import { getChatToken, selectChatToken } from "../../data/get_chat_token";
import { setLoginState, setOpenModal, setVerifyState, setWarningMessage, setWarningState } from '../../data/modal_checker'
import { tokenFactory } from "../../utils/chat";


export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch<any>();
  const update_cookie_status = useSelector((state: any) => state?.update_access_token?.status);
  const myProfile = useSelector(selectMyProfile)
  const chatToken = useSelector(selectChatToken)
  const myProfileStatus = useSelector((state: any) => state?.profile_me?.status)
  const myProfileError = useSelector((state: any) => state?.profile_me?.error)

  const pathname = usePathname()
  const router = useRouter();
  const params = useParams();
  const hash = useHash();

  const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('chatToken')
    dispatch(setAuthState(false))
    router.push(pathname)
    router.refresh();
  }

  useMemo(() => {
    if (hash) {
      const hashParams = new URLSearchParams(hash.slice(1))

      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const expiresAt = hashParams.get('expires_at');
      const expiresIn = hashParams.get('expires_in');


      if (accessToken && refreshToken && expiresAt) {
        Cookies.set(
          'accessToken',
          accessToken,
          { expires: new Date(parseInt(expiresAt) * 1000), path: '/', sameSite: 'Lax', secure: true },
        )

        Cookies.set(
          'refreshToken',
          refreshToken,
          { path: '/', sameSite: 'Lax', secure: true }
        )

        setTimeout(() => {
          dispatch(resetMyProfile())
          router.replace('/');
          toast.success("Электронная почта успешно подтверждена");
          dispatch(setAuthState(true))
          dispatch(setVerifyState(false))
        }, 0)
      }
      else {
        setTimeout(() => {
          toast.error("Не удалось подтвердить электронную почту! Пожалуйста, попробуйте еще раз");
          router.push('/');
        }, 0)
      }
    }
    if (pathname && pathname.includes("unauthorized_client")) {
      setTimeout(() => {
        toast.error("Не удалось подтвердить электронную почту! Пожалуйста, попробуйте еще раз");
        router.push('/');
      }, 0)
    }
  }, [router, dispatch, params, hash])

  useEffect(() => {
    async function loadUserFromCookies() {
      setAuthToken(Cookies.get('accessToken'))

      if (Cookies.get('accessToken')) {
        if (myProfileStatus === 'idle') {
          await dispatch(getMyProfile({}))
        }
        if (myProfile && (!Cookies.get('chatToken') || !chatToken)) {
          dispatch(getChatToken())
          await tokenFactory()
        }
        if (myProfileStatus === 'failed') {
          if (myProfileError) {
            if (myProfileError?.reason == 'token_expired') {
              handleLogout()
              dispatch(setLoginState(true))
              dispatch(setOpenModal(true))
            }
          }
          dispatch(setAuthState(false));
        }


        dispatch(setAuthState(true));
      }

      if (Cookies.get('refreshToken')) {
        if (update_cookie_status === "idle" && !Cookies.get('accessToken')) {
          dispatch(getUpdatedAccessToken())
          if (update_cookie_status === 'succeeded') {
            dispatch(setAuthState(true));

            if (myProfileStatus === 'idle') {
              await dispatch(getMyProfile({}))
            }

          }
        }
      } else {
        dispatch(setAuthState(false));
      }
    }
    loadUserFromCookies();
  }, [dispatch, update_cookie_status, myProfileStatus]);

  return (
    <AuthContext.Provider
      value={{}}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
