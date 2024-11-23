import { Box } from '@chakra-ui/react';
import { FirstBox, SecondBox, ThirdBox } from './styles/SidebarButton.component';
import { useSidebar } from '@/contexts/SidebarContext';

export default function SidebarButton(): JSX.Element {
    const { sidebarOpen, toggleSidebar, sidebarButtonRef} = useSidebar();

    return (
        <Box
            ref={sidebarButtonRef}
            onClick={toggleSidebar}
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
                isClose={sidebarOpen}
            />
            <SecondBox
                isClose={sidebarOpen}
            />
            <ThirdBox
                isClose={sidebarOpen}
            />
        </Box>
    );
}