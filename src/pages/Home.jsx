import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  margin-bottom: 40px;
  z-index: 10;
`;

const Subtitle = styled.p`
  color: var(--sub-color);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 12px;
`;

const MainTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--text-main);
  line-height: 1.3;
  word-break: keep-all;

  span {
    color: var(--main-color);
  }
`;

const ImagePlaceholder = styled.div`
  width: 240px;
  height: 240px;
  background-color: #ffeed3;
  border-radius: 50%;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  box-shadow: 0 10px 30px rgba(255, 118, 1, 0.15);
  z-index: 10;

  /* 디자이너님, 여기에 실제 일러스트 이미지를 넣으시면 됩니다! */
  /* background-image: url('../assets/main-character.png'); */
  /* background-size: cover; */
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  z-index: 10;
`;

const BottomText = styled.p`
  margin-top: 24px;
  font-size: 0.9rem;
  color: var(--text-sub);
`;

const DecorativeCircle1 = styled.div`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background-color: #ffdeb8;
  border-radius: 50%;
  opacity: 0.5;
  z-index: 1;
`;

const DecorativeCircle2 = styled.div`
  position: absolute;
  bottom: 100px;
  left: -80px;
  width: 150px;
  height: 150px;
  background-color: var(--main-color);
  border-radius: 50%;
  opacity: 0.1;
  z-index: 1;
`;

const Home = () => {
    const navigate = useNavigate();

    return (
        <HomeContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
        >
            <TitleWrapper>
                <Subtitle>화랑미술전 특별 기획</Subtitle>
                <MainTitle>
                    1분만에 확인하는<br />
                    <span>카페사장 DNA</span> 테스트
                </MainTitle>
            </TitleWrapper>

            <ImagePlaceholder>
                ☕️
            </ImagePlaceholder>

            <ButtonContainer>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/test/1')}
                >
                    테스트 시작하기
                </button>
                <BottomText>
                    나의 숨겨진 장사꾼 포텐셜을 확인해보세요!
                </BottomText>
            </ButtonContainer>

            <DecorativeCircle1 />
            <DecorativeCircle2 />
        </HomeContainer>
    );
};

export default Home;
