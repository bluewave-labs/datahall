import { useState } from 'react';
import { SketchPicker } from 'react-color';

import { Box, Dialog, IconButton, TextField } from '@mui/material';

import { convertTransparencyToHex } from '@/shared/utils';

export default function ColorPickerBox() {
	const [pickerColor, setPickerColor] = useState('#ffffff');
	const [showPicker, setShowPicker] = useState(false);

	const handleColorChange = (newColor: any) => {
		//Concat the 2-digit hex as a transparency number to newColor.hex
		const transparentColor = newColor.hex.concat(convertTransparencyToHex(newColor.rgb.a));
		setPickerColor(transparentColor); //Push the changed color to color state
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPickerColor(event.target.value); //Push the hex code
	};

	//Open and close a color picker
	const togglePicker = () => {
		setShowPicker(!showPicker);
	};

	return (
		<Box
			border={1}
			borderColor='text.notes'
			borderRadius={2}
			width={150}
			p={3}
			display='flex'
			alignItems='center'>
			<IconButton
				sx={{
					backgroundColor: pickerColor,
					border: 1,
					borderRadius: 2,
					p: 5,
					'&:hover': {
						backgroundColor: pickerColor,
					},
				}}
				onClick={togglePicker}></IconButton>
			<TextField
				value={pickerColor}
				onChange={handleInputChange}
				sx={{
					'& .MuiInputBase-input': { py: 0 },
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							border: 'none',
						},
					},
				}}
			/>
			<Dialog
				onClose={togglePicker}
				open={showPicker}
				sx={{
					'& .MuiPaper-root': {
						minWidth: 200,
					},
				}}>
				<SketchPicker
					color={pickerColor}
					onChange={handleColorChange}
				/>
			</Dialog>
		</Box>
	);
}
