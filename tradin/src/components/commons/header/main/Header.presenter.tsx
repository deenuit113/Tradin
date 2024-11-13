import HeaderNotice from "../notice/Notice.container";
import SidebarButton from "./SidebarButton";
import { FaBullhorn, FaMoon, FaSun, FaUser } from "react-icons/fa";
import { HeaderUIProps } from "./Header.types";
import { announcements } from "./MockAnnouncements";
import { useUser } from "../../../../contexts/UserContext";
import { useSidebar } from "../../../../contexts/SidebarContext";
import { usePathname } from "next/navigation";
import { useColorMode } from "@/components/ui/color-mode";
import { Switch } from "@/components/ui/switch";
import { Button, Flex, Icon, IconButton, } from "@chakra-ui/react";
import * as C from "./styles/components/Header.components"
import { Avatar } from "@/components/ui/avatar";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu"

export default function HeaderUI(props: HeaderUIProps): JSX.Element {
    const { user, loggedIn } = useUser();
    const { toggleSidebar} = useSidebar();
    const { toggleColorMode, colorMode } = useColorMode();

    const pathname = usePathname();
    const excludedPaths = ['/login'];
    const shouldShowLayout = !excludedPaths.includes(pathname);

   return (
        <C.HeaderContainer>
            <C.LeftContainer>
                <C.SidebarBtnContainer>
                    {shouldShowLayout && (
                        <>
                            <SidebarButton onClick={toggleSidebar}/>
                        </>
                    )}
                </C.SidebarBtnContainer>
                <C.Title onClick={props.handleTitleClick}>
                    <svg className="logo" xmlns="http://www.w3.org/2000/svg" width="264" height="132">
                        <rect x="8" y="53.7" width="18" height="3.8" className="logo" id="t-bar" fill="#2c3e50"/>
                        <rect x="14.91" y="54.91" width="4.2" height="22.1" className="logo" fill="#2c3e50"/>
                        <text x="21.82" y="76.74" fontFamily="Arial, sans-serif" fontSize="25.3" fontWeight="bold" className="logo" fill="#2c3e50">
                            radin
                        </text>
                    </svg>
                    <text className="Title-SVP">Tradin</text>
                </C.Title>
            </C.LeftContainer>
            <C.CenterContainer>
                <C.Marquee key={props.currentAnnouncement}>
                    
                    <p>
                        {`${announcements[props.currentAnnouncement].title}: ${announcements[props.currentAnnouncement].content}`}
                    </p>
                </C.Marquee>
            </C.CenterContainer>
            <Flex justify="space-between" align="center" gap="10px" paddingRight="1rem">
                <C.DarkModeButton onClick={toggleColorMode} variant="ghost">
                    {colorMode === 'dark' ?
                        <FaMoon color="FFFF00" /> : <FaSun color="#FC8720" />
                    }
                </C.DarkModeButton>
                <HeaderNotice />

                {(loggedIn && user && user.id) ? (
                    <>
                        <MenuRoot>
                            <MenuTrigger asChild>
                                <IconButton
                                    bg="transparent"
                                >
                                    <Avatar
                                        size="xs"
                                        cursor="pointer"
                                        name={user.displayName ?? 'User'}
                                        src={user.photoUrl ?? undefined}
                                        icon={<Icon as={FaUser} />}
                                        shape="rounded"
                                    />
                                </IconButton>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem value="sign-out" onClick={props.onClickSignOut} cursor="pointer">
                                    Sign Out
                                </MenuItem>
                                <MenuItem value="Profile" onClick={props.onClickMoveToProfile} cursor="pointer">
                                    Profile
                                </MenuItem>
                            </MenuContent>
                        </MenuRoot>
                        
                    </>
                ) : (
                    <>
                        <Button size="xs" fontWeight="700" color="textColor" bg="backgroundColor.primary" onClick={props.onClickMoveToLogin}>
                            Sign in / up
                        </Button>
                    </>
                )}
            </Flex>
        </C.HeaderContainer>
   );
}