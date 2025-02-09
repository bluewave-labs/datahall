import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Avatar, Box, Chip, IconButton, TableCell, TableRow, Typography } from '@mui/material';

import { BarChartIcon, CheckIcon, LinkIcon, SettingsIcon } from '@/../public/assets/icons';

import NavLink from '@/components/NavLink';
import ActionMenu from './ActionMenu';

import { DocumentType, FileTypeConfig } from '@/utils/shared/models';
import { formatDateTime } from '@/utils/shared/utils';

interface Props {
	document: DocumentType;
	onDelete: (documentId: string) => void;
}

const DocumentsTableRow = ({ document, onDelete }: Props) => {
	const router = useRouter();
	const [isLinkCopied, setIsLinkCopied] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const routetoDocument = () => {
		router.push(`/documents/${document.document_id}`);
	};
	const linkToCopy = document.createdLinks?.[0]?.createdLink;

	const handleLinkCopy = () => {
		if (linkToCopy) {
			navigator.clipboard.writeText(linkToCopy);
			setIsLinkCopied(true);
			setTimeout(() => {
				setIsLinkCopied(false);
			}, 3000);
		}
	};

	return (
		<TableRow hover>
			<TableCell sx={{ pr: 0, textAlign: 'center' }}>
				<Box
					component={FileTypeConfig[document.fileType] || FileTypeConfig['General']}
					sx={{ width: 24, height: 24 }}
				/>
			</TableCell>
			<TableCell>
				<Box
					display='flex'
					alignItems='center'>
					<Box>
						<NavLink
							href={`/documents/${document.document_id}`}
							linkText={document.fileName}
							color='text.primary'
							prefetch={true}
						/>

						<Typography
							variant='caption'
							component='div'
							display='flex'
							alignItems='center'
							gap='0.5rem'>
							<span>{formatDateTime(document.createdAt)}</span>
							<Typography variant='subtitle1'>•</Typography>
							<span>{document.links} links</span>
							<Typography variant='subtitle1'>•</Typography>
							<span>Version 1</span>
						</Typography>
					</Box>
				</Box>
			</TableCell>
			<TableCell>
				<Box
					display='flex'
					alignItems='center'
					textTransform='capitalize'>
					{document.uploader.avatar ? (
						<Avatar
							src={document.uploader.avatar}
							alt={document.uploader.name}
							sx={{ width: 24, height: 24, mr: 5 }}
						/>
					) : (
						<Avatar
							alt={document.uploader.name}
							sx={{ width: 24, height: 24, mr: 5 }}>
							{document.uploader.name.charAt(0).toUpperCase()}
						</Avatar>
					)}
					{document.uploader.name}
				</Box>
			</TableCell>

			<TableCell>
				<Chip
					icon={<BarChartIcon />}
					label={`${document.viewers} views`}
					size='small'
					color='secondary'
					sx={{
						width: '5.5rem',
					}}
				/>
			</TableCell>
			<TableCell sx={{ pl: '1.5rem' }}>
				<IconButton
					disabled={document.createdLinks?.length === 0}
					onClick={handleLinkCopy}>
					{isLinkCopied ? (
						<CheckIcon />
					) : (
						<LinkIcon disabled={document.createdLinks?.length === 0} />
					)}
				</IconButton>
			</TableCell>
			<TableCell sx={{ pl: '1.5rem' }}>
				<IconButton onClick={handleMenuOpen}>
					<SettingsIcon
						width={20}
						height={20}
					/>
				</IconButton>
				{open && (
					<ActionMenu
						open={open}
						anchorEl={anchorEl}
						onDelete={onDelete}
						documentId={document.document_id}
						onClose={handleMenuClose}
						onAnalytics={routetoDocument}
					/>
				)}
			</TableCell>
		</TableRow>
	);
};

export default DocumentsTableRow;
