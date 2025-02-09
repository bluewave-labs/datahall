import 'pdfjs-dist/web/pdf_viewer.css';
import React, { useEffect, useRef, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source copy the worker file from node_modules/pdfjs-dist/build/pdf.worker.min.js to public/pdf.worker.min.mjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

interface PdfViewerProps {
	pdfUrl: string;
}

export default function PdfViewer({ pdfUrl }: PdfViewerProps) {
	const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [isRendering, setIsRendering] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Load PDF once
	useEffect(() => {
		const loadPdf = async () => {
			const loadingTask = pdfjsLib.getDocument(pdfUrl);
			const pdfDocument = await loadingTask.promise;
			setPdf(pdfDocument);
			setTotalPages(pdfDocument.numPages);
		};
		loadPdf();
	}, [pdfUrl]);

	// Render current page whenever pdf or currentPage changes
	useEffect(() => {
		if (!pdf || isRendering) return;

		const renderPage = async () => {
			setIsRendering(true);
			try {
				const page = await pdf.getPage(currentPage);
				const viewport = page.getViewport({ scale: 1, rotation: 0 });
				const canvas = canvasRef.current;

				if (canvas) {
					const context = canvas.getContext('2d');
					if (context) {
						canvas.width = viewport.width;
						canvas.height = viewport.height;
						await page.render({
							canvasContext: context,
							viewport,
						}).promise;
					}
				}
			} catch (error) {
				console.error('Error rendering PDF page:', error);
			} finally {
				setIsRendering(false);
			}
		};

		renderPage();
	}, [pdf, currentPage, isRendering]);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'>
			<canvas ref={canvasRef} />
			<Box
				mt={2}
				display='flex'
				alignItems='center'
				gap={2}>
				<Button
					variant='outlined'
					disabled={currentPage === 1}
					onClick={handlePrevPage}>
					Previous
				</Button>
				<Typography variant='body1'>
					Page {currentPage} of {totalPages}
				</Typography>
				<Button
					variant='outlined'
					disabled={currentPage === totalPages}
					onClick={handleNextPage}>
					Next
				</Button>
			</Box>
		</Box>
	);
}
