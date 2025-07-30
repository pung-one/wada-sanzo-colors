import styled from "styled-components";
import Screenshot1 from "@/public/app_screenshots/IMG_2554.png";
import Screenshot2 from "@/public/app_screenshots/IMG_2556.png";
import Screenshot4 from "@/public/app_screenshots/IMG_2573.png";
import AppStoreButtonBlack from "@/public/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";
import Image from "next/image";

export function AppStoreLink() {
  return (
    <Container href="" target="_blank">
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
      </ScreenshotContainer>

      <AppStoreImg
        src={AppStoreButtonBlack}
        alt="app store button"
        width={AppStoreButtonBlack.width}
        height={AppStoreButtonBlack.height}
      />
    </Container>
  );
}

const Container = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
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
  height: 50px;
  width: fit-content;
  object-fit: contain;
`;
