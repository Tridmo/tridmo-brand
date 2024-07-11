"use client";

import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedConversation, setSelectedConversation } from '../../../data/chat';
import { selectMyProfile } from '../../../data/me';
import { tokenFactory } from '../../../utils/chat';
import { WyMessenger, useWeavy } from '@weavy/uikit-react';
import { CHAT_SERVER_URL } from '../../../utils/env_vars';
import { setRouteCrumbs } from '../../../data/route_crumbs';

export default function Chat() {

  const dispatch = useDispatch<any>()
  const selectedConversation = useSelector(selectSelectedConversation)
  const selected = selectedConversation;

  useWeavy({
    url: CHAT_SERVER_URL,
    tokenFactory: tokenFactory
  });

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


  return (
    <Box sx={{ background: "#fafafa" }} className="products" >
      <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
        <Grid container
          sx={{
            minHeight: '100dvh',
            margin: '32px 0 40px 0',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}
        >
          <Grid item xs={12}>
            <WyMessenger
              noMeetings
              noPolls
              conversationId={selected || null}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}