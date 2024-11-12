import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';

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
        <Button
            onClick={handleClick}
            bg="transparent"
            border="none"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={{ base: '32px', md: '40px' }}
            height={{ base: '32px', md: '40px' }}
            padding="0"
            cursor="pointer"
            gap="3px"
        >
            <Box
                bg="iconColor"
                width={{ base: '19.2px', md: '24px' }}
                height={{ base: '3.2px', md: '4px' }}
                borderRadius="2px"
                transition="all 0.3s ease-in-out"
                transformOrigin="2px 4px"
                transform={
                    isClose
                        ? 'rotate(45deg) translate(0px, 0px)'
                        : 'rotate(0deg)'
                }
            />
            
            <Box
                bg="iconColor"
                width={{ base: '19.2px', md: '24px' }}
                height={{ base: '3.2px', md: '4px' }}
                borderRadius="2px"
                transition="all 0.3s ease-in-out"
                transformOrigin="center"
                transform={isClose ? 'scaleX(0)' : 'scaleX(1)'}
            />
            
            <Box
                bg="iconColor"
                width={{ base: '19.2px', md: '24px' }}
                height={{ base: '3.2px', md: '4px' }}
                borderRadius="2px"
                transition="all 0.3s ease-in-out"
                transformOrigin="2px 0px"
                transform={
                    isClose
                        ? 'rotate(-45deg) translate(0px, 0px)'
                        : 'rotate(0deg)'
                }
            />
        </Button>
    );
}