import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../public/main.webp';
import CustomButton from '../components/Button/Button';

const RootContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3,
    zIndex: -1,
  },
});

const HomeHeader = styled(Typography)({
  marginTop: '2%',
  marginBottom: '2%',
  top: '20%',
});

const Description = styled(Typography)({
  width: '600px',
  textAlign: 'center',
  fontSize: 22,
  display: 'flex',
  top: '40%',
});

const FeaturesList = styled(Grid)({
  margin: '0 300px 2% 300px',
  top: '55%',
});

const FeatureItem = styled(Grid)({
  margin: '0 450px 2% 450px',
  fontSize: 30,
  display: 'flex',
  alignItems: 'center',
});

const FeatureIcon = styled('span')({
  marginRight: '8px',
});

const FeatureText = styled(Typography)({});

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigator = useNavigate();

  return (
    <RootContainer>
      {/* <Image src="../../../public/main.webp" alt="Головна сторінка" /> */}
      <HomeHeader variant="h4">{t('home.welcome')}</HomeHeader>
      <CustomButton
        style={{
          position: 'static',
          height: '45px',
          marginBottom: '3%',
          width: '35%',
          top: '25%',
          borderRadius: '7px',
          fontSize: 20,
          cursor: 'pointer',
        }}
        onClick={() => {
          navigator('/game');
        }}
      >
        {t('home.play')}
      </CustomButton>
      <Description variant="body1">{t('home.description')}</Description>
      <FeaturesList container spacing={2}>
        <FeatureItem item xs={12} sm={6} md={4}>
          <FeatureIcon>🌍</FeatureIcon>
          <FeatureText>{t('home.firstFeature')}</FeatureText>
        </FeatureItem>
        <FeatureItem item xs={12} sm={6} md={4}>
          <FeatureIcon>🔍</FeatureIcon>
          <FeatureText>{t('home.secondFeature')} </FeatureText>
        </FeatureItem>
        <FeatureItem item xs={12} sm={6} md={4}>
          <FeatureIcon>⏱️</FeatureIcon>
          <FeatureText>{t('home.thirdFeature')} </FeatureText>
        </FeatureItem>
      </FeaturesList>
    </RootContainer>
  );
};

export default HomePage;
