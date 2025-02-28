'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import FileAccessFormModal from './FileAccessFormModal';
import FileAccessMessage from './FileAccessMessage';
import FileAccess from './FileDisplay';

import { LoadingSpinner } from '@/components';
import { useFormSubmission, useToast } from '@/hooks';
import { LinkData } from '@/shared/models';

interface Props {
	linkId: string;
}

export default function FileAccessContainer({ linkId }: Props) {
	const [linkData, setLinkData] = useState<LinkData>({});
	const [loading, setLoading] = useState(true);
	const [fetchLinkError, setFetchLinkError] = useState<string>(''); // store error from GET
	const toast = useToast();

	useEffect(() => {
		const fetchLinkDetails = async () => {
			setLoading(true);
			setFetchLinkError('');
			try {
				const response = await axios.get(`/api/public_links/${linkId}`);
				if (!response?.data?.data) {
					// e.g. 404 or expired
					setFetchLinkError(response?.data?.message || 'Link not found or expired.');
				} else {
					const { isPasswordProtected, needsUserDetails } = response.data.data;
					setLinkData({
						isPasswordProtected,
						requiredUserDetailsOption: needsUserDetails ? 2 : 0,
					});
				}
			} catch (error: any) {
				console.error('Error fetching link details:', error);
				const msg = error?.response?.data?.message || 'Unexpected error fetching link details.';
				setFetchLinkError(msg);
				toast.showToast({ variant: 'error', message: msg });
			} finally {
				setLoading(false);
			}
		};

		fetchLinkDetails();
	}, [linkId, toast]);

	const { handleSubmit } = useFormSubmission({
		onSubmit: async () => {
			if (!linkId) throw new Error('Missing linkId.');

			const payload = {
				linkId,
				first_name: '',
				last_name: '',
				email: '',
				password: '',
			};

			const response = await axios.post(`/api/public_links/${linkId}/access`, payload);
			if (!response?.data?.data) {
				throw new Error(response.data?.message || 'Unable to access file.');
			}

			setLinkData((prev) => ({
				...prev,
				signedUrl: response.data.data.signedUrl,
				fileName: response.data.data.fileName,
				size: response.data.data.size,
			}));
		},

		successMessage: 'File accessed successfully!',

		errorMessage: 'Error accessing the link. Please try again later.',
		onError: (errMsg) => {
			setFetchLinkError(errMsg);
		},
	});

	useEffect(() => {
		if (!loading) {
			const { isPasswordProtected, requiredUserDetailsOption, signedUrl } = linkData;
			const isTrulyPublic = !isPasswordProtected && !requiredUserDetailsOption;
			if (isTrulyPublic && !signedUrl) {
				handleSubmit({ preventDefault: () => {} } as any);
			}
		}
	}, [loading, linkData, handleSubmit]);

	function handleFileAccessFormModalSubmit(data: { [key: string]: any }) {
		setLinkData((prev) => ({
			...prev,
			signedUrl: data.signedUrl,
			fileName: data.fileName,
			size: data.size,
		}));
	}

	if (loading) {
		return <LoadingSpinner />;
	}

	if (fetchLinkError) {
		return <FileAccessMessage message={fetchLinkError} />;
	}

	// If we have a signedUrl => show file
	if (linkData.signedUrl) {
		return (
			<FileAccess
				size={linkData.size || 0}
				fileName={linkData.fileName || 'Document'}
				signedUrl={linkData.signedUrl}
			/>
		);
	}

	return (
		<Container>
			<FileAccessFormModal
				linkId={linkId}
				passwordRequired={!!linkData.isPasswordProtected}
				userDetailsOption={linkData.requiredUserDetailsOption ?? 0}
				onFileAccessModalSubmit={handleFileAccessFormModalSubmit}
			/>
		</Container>
	);
}
