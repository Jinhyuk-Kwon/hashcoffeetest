import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';

const TestContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 40px 20px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-sub);
`;

const ProgressInfo = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--main-color);
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #ffe6d3;
  border-radius: 4px;
  margin-bottom: 50px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background-color: var(--main-color);
  border-radius: 4px;
`;

const QuestionSection = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionNumber = styled.h2`
  color: var(--sub-color);
  font-size: 1.2rem;
  margin-bottom: 16px;
  font-weight: 800;
`;

const QuestionText = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 60px;
  color: var(--text-main);
  word-break: keep-all;
`;

const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OptionButton = styled.button`
  width: 100%;
  background-color: white;
  border: 2px solid #ffdec3;
  border-radius: var(--border-radius);
  padding: 24px 20px;
  font-size: 1.1rem;
  line-height: 1.5;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  text-align: center;
  word-break: keep-all;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);

  &:hover {
    border-color: var(--main-color);
    background-color: #fffaf6;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(255,118,1,0.1);
  }
`;

// 앱 전체의 상태(점수)를 관리하기 위해 간단한 지역 변수 사용 (실제론 Redux/Context가 좋으나 간단한 테스터기이므로 세션스토리지 활용)
const Test = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const qNum = parseInt(id) || 1;
    const currentQuestion = questions[qNum - 1];

    const handleBack = () => {
        if (qNum > 1) {
            navigate(`/test/${qNum - 1}`);
        } else {
            navigate('/');
        }
    };

    const handleOptionClick = (scoreObj) => {
        // 세션 스토리지에 점수 누적
        const savedScores = JSON.parse(sessionStorage.getItem('mbtiScores')) || {};

        // 점수 업데이트 로직
        const newScores = { ...savedScores };
        Object.keys(scoreObj).forEach(key => {
            newScores[key] = (newScores[key] || 0) + scoreObj[key];
        });

        sessionStorage.setItem('mbtiScores', JSON.stringify(newScores));

        // 다음 페이지 이동 혹은 결과 로딩 페이지로 이동
        if (qNum < questions.length) {
            navigate(`/test/${qNum + 1}`);
        } else {
            navigate('/loading');
        }
    };

    // 프로그레스 바 비율 계산
    const progressPercent = (qNum / questions.length) * 100;

    if (!currentQuestion) return <div>잘못된 접근입니다.</div>;

    return (
        <TestContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Header>
                <BackButton onClick={handleBack}>←</BackButton>
                <ProgressInfo>{qNum} / {questions.length}</ProgressInfo>
            </Header>

            <ProgressBarContainer>
                <ProgressBar
                    initial={{ width: `${((qNum - 1) / questions.length) * 100}%` }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                />
            </ProgressBarContainer>

            <AnimatePresence mode="wait">
                <QuestionSection
                    key={qNum}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    <QuestionNumber>Q{qNum}.</QuestionNumber>
                    <QuestionText>{currentQuestion.question}</QuestionText>

                    <OptionContainer>
                        {currentQuestion.options.map((option, index) => (
                            <OptionButton
                                key={index}
                                onClick={() => handleOptionClick(option.score)}
                            >
                                {option.text}
                            </OptionButton>
                        ))}
                    </OptionContainer>
                </QuestionSection>
            </AnimatePresence>
        </TestContainer>
    );
};

export default Test;
