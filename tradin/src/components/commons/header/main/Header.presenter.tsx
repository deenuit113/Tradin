import * as S from "./Header.styles";
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import NavBar from "../../nav/Nav";
import HeaderNotice from "../notice/Notice.container";
import SidebarButton from "./SidebarButton";
import { FaUser } from "react-icons/fa";
import { HeaderUIProps } from "./Header.types";
import { announcements } from "./MockAnnouncements";
import { useUser } from "../../../../contexts/UserContext";
import { useRecoilState } from "recoil";
import { darkMode } from "../../../../util/atoms";
import { useSidebar } from "../../../../contexts/SidebarContext";
import { usePathname } from "next/navigation";
import { useColorMode } from "@/components/ui/color-mode";

export default function HeaderUI(props: HeaderUIProps): JSX.Element {
    const { user, loggedIn } = useUser();
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkMode);
    const { toggleSidebar } = useSidebar();
    const { toggleColorMode } = useColorMode();

    const pathname = usePathname();
    const excludedPaths = ['/login'];
    const shouldShowLayout = !excludedPaths.includes(pathname);
    // onChange={() => setIsDarkMode(prev => !prev)}
   return (
        <S.HeaderContainer>
            <S.Left>
                <S.SidebarButtonContainer>
                    {shouldShowLayout && (
                        <>
                            <SidebarButton onClick={toggleSidebar}/>
                        </>
                    )}
                </S.SidebarButtonContainer>
                <S.Title onClick={props.handleTitleClick}>
                    <svg className="logo" xmlns="http://www.w3.org/2000/svg" width="264" height="132">
                        <rect x="8" y="53.7" width="18" height="3.4" className="logo" id="t-bar" fill="#2c3e50"/>
                        <rect x="14.91" y="54.91" width="3.4" height="22.1" className="logo" fill="#2c3e50"/>
                        <text x="21.82" y="76.74" fontFamily="Arial, sans-serif" fontSize="25.3" fontWeight="bold" className="logo" fill="#2c3e50">
                            radin
                        </text>
                    </svg>
                    <text className="Title-SVP">Tradin</text>
                </S.Title>
                <NavBar />
            </S.Left>
            <S.Center>
                {/* {props.articles.length > 0 && (
                    <S.Marquee key={props.currentAnnouncement}>
                        <a href={props.articles[props.currentAnnouncement].link} target="_blank" rel="noopener noreferrer">
                            {props.articles[props.currentAnnouncement].title}
                        </a>
                    </S.Marquee>
                )} */}
                <S.Marquee key={props.currentAnnouncement}>
                    <p>
                        {`${announcements[props.currentAnnouncement].title}: ${announcements[props.currentAnnouncement].content}`}
                    </p>
                </S.Marquee>
            </S.Center>
            <S.Right>
                <S.IconList>
                    <S.IconListItem>
                        <Switch
                            onChange={toggleColorMode}
                            checked={isDarkMode}
                            offColor="#888"
                            onColor="#0d6efd"
                            uncheckedIcon={<S.SunIcon icon={faSun} style={{ color: 'yellow', padding: '5px' }} className="SunIcon"/>}
                            checkedIcon={<S.MoonIcon icon={faMoon} style={{ color: 'white', padding: '5px' }} className="MoonIcon"/>}
                            height={30}
                            width={50}
                            aria-label="다크모드 스위치"
                            role="switch"
                            className="DarkMode-Switch"
                        />
                    </S.IconListItem>
                    <S.IconListItem>
                        <HeaderNotice />
                    </S.IconListItem>

                    <S.IconListItem>
                        {(loggedIn && user && user.id) ? (
                            <>
                                <S.UserProfile>
                                    {user?.photoUrl ? (
                                        <S.UserImg
                                            src={user.photoUrl}
                                            alt={user.displayName ?? 'User profile picture'}
                                        />
                                    ) : (
                                        <FaUser className="userIcon"/>
                                    )}
                                    <S.UserDropDown className="userDropDown">
                                        <S.UserDropDownItem onClick={props.onClickSignOut}>Sign Out</S.UserDropDownItem>
                                        <S.UserDropDownItem onClick={props.onClickMoveToProfile}>Profile</S.UserDropDownItem>
                                    </S.UserDropDown>
                                </S.UserProfile>
                            </>
                        ) : (
                            <>
                                <S.SignInUpContainer>
                                    <S.SignInUp onClick={props.onClickMoveToLogin}>Sign in / up</S.SignInUp>
                                </S.SignInUpContainer>
                            </>
                        )}
                    </S.IconListItem>

                </S.IconList>
            </S.Right>
        </S.HeaderContainer>
   );
}