import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { results, calculateResultLevel } from '../data/results';

const ResultContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 20px 80px;
  background-color: var(--bg-color);
`;

const LevelBadge = styled.div`
  background-color: ${props => props.color || 'var(--main-color)'};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.9rem;
  margin-bottom: 24px;
  letter-spacing: 1px;
`;

const ResultTitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Subtitle = styled.h3`
  font-size: 1.1rem;
  color: var(--text-sub);
  margin-bottom: 12px;
  font-weight: 700;
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  color: ${props => props.color || 'var(--text-main)'};
  line-height: 1.3;
  word-break: keep-all;
`;

const ResultImage = styled.div`
  width: 250px;
  height: 250px;
  background-color: white;
  border-radius: 50%;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);

  /* 디자이너님, 결과 레벨에 맞는 이미지를 이곳에 렌더링하도록 수정하시면 됩니다. */
`;

const DescriptionBox = styled.div`
  background-color: white;
  width: 100%;
  padding: 30px 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  margin-bottom: 24px;
`;

const DescText = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text-main);
  margin-bottom: 20px;
  text-align: center;
  word-break: keep-all;
`;

const HashMessage = styled.div`
  background-color: #fff5ec;
  padding: 20px;
  border-radius: 12px;
  font-weight: 700;
  color: var(--sub-color);
  line-height: 1.5;
  text-align: center;
  word-break: keep-all;
`;

const ActionSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

const EventBanner = styled.a`
  display: block;
  background: linear-gradient(135deg, #FF7601 0%, #FF4601 100%);
  color: white;
  text-decoration: none;
  padding: 24px 20px;
  border-radius: var(--border-radius);
  text-align: center;
  font-weight: 800;
  font-size: 1.1rem;
  box-shadow: 0 8px 20px rgba(255,118,1,0.3);
  margin-bottom: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  span {
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    opacity: 0.9;
    margin-top: 8px;
  }
`;

const Result = () => {
    const navigate = useNavigate();
    const [resultData, setResultData] = useState(null);

    useEffect(() => {
        // 세션 스토리지에서 점수 읽기
        const savedScoresStr = sessionStorage.getItem('mbtiScores');
        if (!savedScoresStr) {
            // 점수가 없으면 홈으로 돌려보냄
            navigate('/');
            return;
        }

        const scores = JSON.parse(savedScoresStr);
        const level = calculateResultLevel(scores);

        // 결과 데이터 매칭 (level 은 1~5)
        const matchedResult = results.find(r => r.level === level) || results[2]; // 기본값 Level 3
        setResultData(matchedResult);

    }, [navigate]);

    const handleRestart = () => {
        sessionStorage.removeItem('mbtiScores');
        navigate('/');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '카페사장 DNA 테스트',
                    text: '나의 숨겨진 카페사장 본능을 확인해보세요!',
                    url: window.location.href, // 실제 호스팅 주소로 자동 연경
                });
            } catch (err) {
                console.log('공유 실패:', err);
            }
        } else {
            // 공유 API 미지원 브라우저 클립보드 복사
            navigator.clipboard.writeText(window.location.href);
            alert('링크가 클립보드에 복사되었습니다. 친구들에게 테스트를 공유해보세요!');
        }
    };

    if (!resultData) return null;

    return (
        <ResultContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <LevelBadge color={resultData.color}>LEVEL {resultData.level}</LevelBadge>

            <ResultTitleWrapper>
                <Subtitle>{resultData.subtitle}</Subtitle>
                <MainTitle color={resultData.color}>{resultData.title}</MainTitle>
            </ResultTitleWrapper>

            <ResultImage>
                {/* 임시 이모지 (추후 이미지 태그로 변경 가능) */}
                {resultData.level === 5 && '👑'}
                {resultData.level === 4 && '😎'}
                {resultData.level === 3 && '🤔'}
                {resultData.level === 2 && '🥵'}
                {resultData.level === 1 && '🛌'}
            </ResultImage>

            <DescriptionBox>
                <DescText>{resultData.description}</DescText>
                <HashMessage>{resultData.hashMessage}</HashMessage>
            </DescriptionBox>

            {/* 이벤트 배너: 미술전 특별 이벤트 */}
            <EventBanner href="https://www.hashcoffee.co.kr/" target="_blank" rel="noopener noreferrer">
                🎁 화랑미술전 한정 이벤트 🎁
                <span>종이컵에 예쁜 그림 그리고 SNS 업로드하면 선물이 팡팡! (클릭하여 혜택 알아보기)</span>
            </EventBanner>

            <ActionSection>
                <button
                    className="btn btn-outline"
                    onClick={handleRestart}
                    style={{ borderColor: resultData.color, color: resultData.color }}
                >
                    🔄 다시 테스트하기
                </button>
                <button
                    className="btn"
                    onClick={handleShare}
                    style={{ backgroundColor: '#eeeeee', color: '#333' }}
                >
                    ✉️ 친구에게 결과 공유하기
                </button>
            </ActionSection>

        </ResultContainer>
    );
};

export default Result;
