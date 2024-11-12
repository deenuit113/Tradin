
import { Box, Container, Flex, Grid, GridItem, IconButton, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { LuCheckCircle, LuCircleDashed } from "react-icons/lu";
import { MessageItemProps } from "./NoticeModal.types";

export default function MessageItem(props: MessageItemProps) {
    const name = "Tradin";

    return(
        <Grid templateColumns="40px 1fr" gap={1} alignItems="center" mb={4}>
            <GridItem>
                <Avatar size="xs" variant="solid" name={name} colorPalette="green"/>
            </GridItem>

            <GridItem>
                <Box
                    border="1px solid"
                    borderColor="gray.300"
                    bg="backgroundColor.secondary"
                    p={3}
                    borderRadius="md"
                    position="relative"
                >
                    <Text >
                        {props.message}
                    </Text>
                    <Box position="absolute" top="50%" right="-20px" transform="translateY(-50%)">
                        {props.isRead ? <LuCheckCircle color="green" /> : <LuCircleDashed color="gray" />}
                    </Box>
                </Box>
            </GridItem>
        </Grid>
    )
};