import React from 'react';

import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

import { CheckIcon, CopyIcon, LinkIcon } from '@/icons';

interface ShareableLinkDialogProps {
	linkUrl: string;
	onClose: () => void;
}

export default function ShareableLinkDialog({ linkUrl, onClose }: ShareableLinkDialogProps) {
	const [isLinkCopied, setIsLinkCopied] = React.useState(false);

	function handleLinkCopy() {
		if (linkUrl) {
			navigator.clipboard.writeText(linkUrl);
			setIsLinkCopied(true);
			setTimeout(() => setIsLinkCopied(false), 3000);
		}
	}

	const open = Boolean(linkUrl);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth='sm'>
			<Box
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				width='100%'>
				<DialogTitle variant='h2'>Shareable link</DialogTitle>
			</Box>

			<DialogContent
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: 5,
					width: '100%',
				}}>
				<Chip
					color='secondary'
					icon={<LinkIcon />}
					label={linkUrl}
					sx={{
						typography: 'h4',
						flexGrow: 1,
						justifyContent: 'left',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}
				/>

				<IconButton
					onClick={handleLinkCopy}
					sx={{ transition: '0.2s' }}>
					{isLinkCopied ? (
						<CheckIcon
							width={15}
							height={15}
						/>
					) : (
						<CopyIcon />
					)}
				</IconButton>
			</DialogContent>
		</Dialog>
	);
}
