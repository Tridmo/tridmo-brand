"use client";

import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatUnread, selectSelectedConversation, setSelectedConversation } from '../../../data/chat';
import { selectMyProfile } from '../../../data/me';
import { tokenFactory } from '../../../utils/chat';
import { CHAT_SERVER_URL } from '../../../utils/env_vars';
import { WyMessenger, useWeavy } from '@weavy/uikit-react';
import { setRouteCrumbs } from '../../../data/route_crumbs';
import { CustomTooltip } from '../../tooltip';

export default function Chat() {

  const dispatch = useDispatch<any>()
  const profile = useSelector(selectMyProfile)
  const selectedConversation = useSelector(selectSelectedConversation)
  const selected = selectedConversation;

  useEffect(() => {
    if (selected == selectedConversation) {
      setSelectedConversation(null)
    }
  }, [selected])

  React.useEffect(() => {
    dispatch(setRouteCrumbs([
      {
        title: 'Чат',
        route: '/chat'
      }
    ]))
  }, [])

  function handleChatUnread(e) {
    const x = setTimeout(() => {
      console.log('working');
      dispatch(getChatUnread());
      clearTimeout(x)
    }, 500)
  }


  return (
    <Box sx={{ background: "#fafafa" }} className="products" >
      <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
        <Grid container
          sx={{
            mt: '32px',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
        >
          <Grid item xs={12} id='wy-messenger-container'
            onClick={handleChatUnread}
          >
            <WyMessenger
              uid={`${profile?.username}-messenger`}
              notifications='button-list'
              notificationsBadge='count'
              name='Чат'
              style={{ height: '80dvh' }}
              noMeetings
              noPolls
              noComments
              noWebDAV
              noConfluence
              conversationId={selected || null}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}