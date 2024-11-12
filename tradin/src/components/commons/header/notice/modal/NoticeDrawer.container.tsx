import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
} from "@/components/ui/drawer";
import { NoticeDrawerProps } from "./NoticeModal.types";
import { Button } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Box, Flex, IconButton, Separator } from "@chakra-ui/react";
import { FaBell, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import MessageItem from "./MessageItem";

const mockMessages = [
    { id: 1, type: "type1", content: "첫 번째 메시지입니다.", isRead: false },
    { id: 2, type: "type1", content: "두 번째 메시지입니다.", isRead: false },
    { id: 3, type: "type1", content: "세 번째 메시지입니다.", isRead: true },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
    { id: 4, type: "type1", content: "네 번째 메시지입니다.", isRead: false },
];

export default function NoticeDrawer(props: NoticeDrawerProps): JSX.Element {
    const [activeTab, setActiveTab] = useState(0); // 현재 선택된 탭을 추적하는 상태
    const [messages, setMessages] = useState(mockMessages);

    useEffect(() => {
        if (props.open) {
            setMessages((prevMessages) =>
                prevMessages.map((message) =>
                    !message.isRead ? { ...message, isRead: true } : message
                )
            );
        }
    }, [props.open]);

    const handleTabClick = (index: number) => {
        setActiveTab(index); // 클릭한 탭의 인덱스를 저장
    };

    return (
        <DrawerRoot open={props.open} onOpenChange={props.onClose}>
            <DrawerBackdrop />
            <DrawerContent
                offset="3"
                rounded="lg"
                bg="backgroundColor"
            >
                <DrawerHeader flexDirection="row" bg="backgroundColor" roundedTop="lg">
                    <DrawerTitle>알림</DrawerTitle>
                    <Flex marginTop="5px" alignItems="center" justifyContent="space-between">
                        <SegmentedControl
                            size="xs"
                            defaultValue="전체"
                            items={["전체", "읽음", "읽지 않음"]}
                        />
                        <IconButton variant="outline" size="xs">
                            <FaTrash />
                        </IconButton>
                        <IconButton variant="outline" size="xs">
                            <FaBell />
                        </IconButton>
                    </Flex>
                </DrawerHeader>
                <Separator />
                <DrawerBody bg="backgroundColor.primary">
                    <Box padding="0.5rem" minHeight="100%" height="auto">
                        {messages.map((message) => (
                            <MessageItem key={message.id} type={message.type} message={message.content} isRead={message.isRead} />
                        ))}
                    </Box>
                </DrawerBody>
                <Separator />
                
                {/* Footer with 3 buttons that are distinguishable */}
                <DrawerFooter bg="backgroundColor" borderTop="1px solid borderColor" roundedBottom="lg" p="0">
                    <Flex width="100%" justifyContent="space-between">
                        {/* Each button takes up 1/3 of the width */}
                        {["Home", "Messages", "Setting"].map((label, index) => (
                            <Button
                                key={label}
                                onClick={() => handleTabClick(index)}
                                flexGrow={1}
                                bg={activeTab === index ? "blue.500" : "transparent"} // 선택된 탭은 파란색 배경
                                color={activeTab === index ? "white" : "textColor"} // 선택된 탭은 흰색 텍스트
                                borderLeft={index !== 0 ? "1px solid borderColor" : "none"} // 첫 번째 버튼 제외하고 왼쪽에 border 추가
                                borderRight={index !== 2 ? "1px solid borderColor" : "none"} // 마지막 버튼 제외하고 오른쪽에 border 추가
                                _hover={{
                                    backgroundColor: activeTab === index ? "blue.600" : "gray.100", // 호버 시 색상 변경
                                }}
                                _active={{
                                    backgroundColor: activeTab === index ? "blue.700" : "gray.200", // 클릭 시 색상 변경
                                }}
                                roundedTop="0"
                                borderBottomLeftRadius={index === 0 ? "lg" : "0"}
                                borderBottomRightRadius={index === 2 ? "lg" : "0"}
                            >
                                {label}
                            </Button>
                        ))}
                    </Flex>
                </DrawerFooter>

                {/* Close trigger */}
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    );
}