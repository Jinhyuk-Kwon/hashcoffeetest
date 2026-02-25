import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--main-color);
  color: white;
  text-align: center;
`;

const Spinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  margin-bottom: 30px;
`;

const LoadingText = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 12px;
`;

const LoadingSubtext = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

const Loading = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 2.5초 후 결과 화면으로 이동
        const timer = setTimeout(() => {
            navigate('/result');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <LoadingContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Spinner
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <LoadingText>나의 카페사장 DNA 분석 중...</LoadingText>
                <LoadingSubtext>어떤 결과가 나올까요?</LoadingSubtext>
            </motion.div>
        </LoadingContainer>
    );
};

export default Loading;
