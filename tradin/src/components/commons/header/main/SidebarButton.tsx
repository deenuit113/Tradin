import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { FirstBox, SecondBox, ThirdBox } from './styles/SidebarButton.component';

interface ToggleButtonProps {
    onClick: () => void;
}

export default function SidebarButton(props: ToggleButtonProps): JSX.Element {
    const [isClose, setIsClose] = useState(false);

    const handleClick = () => {
        setIsClose(!isClose);
        props.onClick();
    };

    return (
        <Box
            onClick={handleClick}
            bg="transparent"
            border="none"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="24px"
            height="24px"
            padding="0"
            cursor="pointer"
            gap="4.8px"
            scale={{sm: "0.8"}}
        >
            <FirstBox
                isClose={isClose}
            />
            <SecondBox
                isClose={isClose}
            />
            <ThirdBox
                isClose={isClose}
            />
        </Box>
    );
}