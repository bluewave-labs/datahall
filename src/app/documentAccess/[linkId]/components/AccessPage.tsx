'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from '@mui/material';

import FileAccess from './FileDisplay';
import AccessError from './AccessError';
import VisitorInfoModal from './VisitorInfoModal';

import { LinkData } from '@/shared/models';
import { LoadingSpinner } from '@/components';
import { useFormSubmission, useDocumentAccess } from '@/hooks';

interface Props {
	linkId: string;
}

export default function AccessPage({ linkId }: Props) {
	const [linkData, setLinkData] = useState<LinkData>({});
	const [fetchLinkError, setFetchLinkError] = useState<string>('');
	const [hasInitialized, setHasInitialized] = useState(false); // This flag blocks the rendering of visitorInfoModal till the useEffect finishes to check whether a link url is truly public or not.

	const { error, data, isLoading } = useDocumentAccess(linkId);
	const linkInfo = data?.data ?? {};

	useEffect(() => {
		if (error) {
			setFetchLinkError(error?.message);
			setHasInitialized(true);
		}
	}, [error]);

	const { handleSubmit } = useFormSubmission({
		onSubmit: async () => {
			if (!linkId) throw new Error('Missing linkId.');

			const payload = {
				linkId,
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			};

			const response = await axios.post(`/api/public_links/${linkId}/access`, payload);
			if (!response?.data?.data) {
				throw new Error(response.data?.message || 'Unable to access file.');
			}

			setLinkData({
				signedUrl: response.data.data.signedUrl,
				fileName: response.data.data.fileName,
				size: response.data.data.size,
				documentId: response.data.data.documentId,
			});
		},

		successMessage: 'File accessed successfully!',
		errorMessage: 'Error accessing the link. Please try again later.',
		onError: (errMsg) => {
			setFetchLinkError(errMsg);
		},
	});

	useEffect(() => {
		if (!isLoading && data?.data && !hasInitialized) {
			const { isPasswordProtected, visitorFields, signedUrl } = linkInfo;
			const isTrulyPublic = !isPasswordProtected && visitorFields.length === 0;

			if (isTrulyPublic && !signedUrl) {
				handleSubmit({ preventDefault: () => {} } as any).finally(() => {
					setHasInitialized(true);
				});
			} else {
				setHasInitialized(true);
			}
		}
	}, [isLoading, data, hasInitialized]);

	const handleVisitorInfoFormModalSubmit = (data: { [key: string]: any }) => {
		setLinkData({
			signedUrl: data.signedUrl,
			fileName: data.fileName,
			size: data.size,
		});
	};

	// ⏳ Still fetching or still waiting for useEffect decision logic
	if (isLoading || !hasInitialized) {
		return <LoadingSpinner />;
	}

	if (fetchLinkError) {
		return <AccessError message={fetchLinkError} />;
	}

	if (linkData.signedUrl) {
		return (
			<FileAccess
				size={linkData.size || 0}
				fileName={linkData.fileName || 'Document'}
				signedUrl={linkData.signedUrl}
				documentId={linkData.documentId}
				documentLinkId={linkId}
			/>
		);
	}

	return (
		<Container>
			<VisitorInfoModal
				linkId={linkId}
				visitorFields={linkInfo.visitorFields}
				passwordRequired={linkInfo.isPasswordProtected}
				onVisitorInfoModalSubmit={handleVisitorInfoFormModalSubmit}
			/>
		</Container>
	);
}
