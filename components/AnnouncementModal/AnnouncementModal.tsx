import Link from "next/link";
import styled from "styled-components";
import Screenshot1 from "@/public/app_screenshots/IMG_2554.png";
import Screenshot2 from "@/public/app_screenshots/IMG_2556.png";
import Screenshot3 from "@/public/app_screenshots/IMG_2564.png";
import Screenshot4 from "@/public/app_screenshots/IMG_2573.png";
import Screenshot5 from "@/public/app_screenshots/IMG_2577.png";
import AppStoreButtonBlack from "@/public/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";
import Image from "next/image";

export function AnnouncementModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <Container $show={show} onClick={onClose}>
      <CloseButton />

      <h2>NEW iOS APP</h2>
      <p>
        I published the new iOS app <b>W.S. Colors</b>, which includes almost
        all features from the website and a <b>color scanner</b> which uses the
        phone's camera to find matching combinations for real world colors.
      </p>

      <AppStoreLink href="" target="_blank">
        <ScreenshotContainer>
          <StyledImage
            src={Screenshot1}
            alt="app screenshot 1"
            width={Screenshot1.width}
            height={Screenshot1.height}
          />
          <StyledImage
            src={Screenshot2}
            alt="app screenshot 2"
            width={Screenshot2.width}
            height={Screenshot2.height}
          />
          <StyledImage
            src={Screenshot4}
            alt="app screenshot 4"
            width={Screenshot4.width}
            height={Screenshot4.height}
          />
          {/* <StyledImage
          src={Screenshot3}
          alt="app screenshot 3"
          width={Screenshot3.width}
          height={Screenshot3.height}
        />
        <StyledImage
          src={Screenshot5}
          alt="app screenshot 5"
          width={Screenshot5.width}
          height={Screenshot5.height}
        /> */}
        </ScreenshotContainer>

        <AppStoreImg
          src={AppStoreButtonBlack}
          alt="app store button"
          width={AppStoreButtonBlack.width}
          height={AppStoreButtonBlack.height}
        />
      </AppStoreLink>

      <p>
        The app is for free. If you like it I appreciate a{" "}
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=PAFRAKM2HQWVY"
          target="_blank"
        >
          paypal donation
        </a>
        .
      </p>
    </Container>
  );
}

const Container = styled.div<{ $show: boolean }>`
  position: relative;
  display: ${({ $show }) => ($show ? "initial" : "none")};
  align-items: center;
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 9999;
  width: calc(100% - 20px);
  margin: 10px;
  padding: 20px;
  background-color: white;
  border: 1px solid black;
  box-shadow: 0 0 40px grey;
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }
  p {
    max-width: 600px;
    margin: 0 auto 20px;
    a {
      text-decoration: underline;
    }
  }
  span {
    font-size: 14px;
  }
`;

const AppStoreLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const ScreenshotContainer = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 5px;
  max-width: 400px;
`;

const StyledImage = styled(Image)`
  flex: 1;
  width: 20%;
  height: fit-content;
  object-fit: contain;
`;

const AppStoreImg = styled(Image)`
  height: 40px;
  width: fit-content;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 20%;
    height: 1px;
    width: 60%;
    background: black;
    transition: transform 0.3s ease;
  }
  &:before {
    transform: rotate(-45deg) translateY(0px);
  }
  &:after {
    transform: rotate(45deg) translateY(0px);
  }
`;
