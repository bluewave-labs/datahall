'use client';

import React from 'react';
import axios from 'axios';
import { Container, Box, CircularProgress } from '@mui/material';

import FileAccess from './FileDisplay';
import FileAccessFormModal from './FileAccessFormModal';
import FileAccessMessage from './FileAccessMessage';

interface Params {
  linkId: string;
}

export default function FileAccessPage({ linkId }: Params) {
  const [linkData, setLinkData] = React.useState<{ [key: string]: any; }>({});
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const handleFileAccessFormModalSubmit = (data: React.SetStateAction<{ [key: string]: any; }>) => {
    setLinkData(data);
  };

  React.useEffect(() => {
    const fetchLinkDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/links?linkId=${linkId}`);
        if (!response.data.data) {
          setMessage(response.data.message);
        } else {
          setLinkData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkDetails();
  }, [linkId]);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='50vh'>
        <CircularProgress />
      </Box>
    );
  }

  if (message) {
    return (
      <FileAccessMessage message={message} />
    );
  }

  if (linkData.signedUrl) {
    return (
      <FileAccess
        size={linkData.size}
        fileName={linkData.fileName}
        signedUrl={linkData.signedUrl}
      />
    );
  }

  return (
    <Container>
      <FileAccessFormModal
        linkId={linkId}
        passwordRequired={linkData.isPasswordProtected}
        onFileAccessModalSubmit={handleFileAccessFormModalSubmit}
        userDetailsOption={linkData.requiredUserDetailsOption}
      />
    </Container>
  );
}
