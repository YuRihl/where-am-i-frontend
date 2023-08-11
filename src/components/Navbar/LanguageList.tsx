import {
  FormControl,
  ListItemIcon,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { ReactElement, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { ReactComponent as FlagIconUA } from '../../../public/ukraine-flag.svg';
import { ReactComponent as FlagIconEN } from '../../../public/united-kingdom-flag.svg';
import { Locales } from './enums/locales.enum';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const locales: Record<Locales, { title: string; icon: ReactElement }> = {
  en: {
    title: 'English',
    icon: <FlagIconEN width={24} height={24} />,
  },
  uk: { title: 'Українська', icon: <FlagIconUA width={24} height={24} /> },
};

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleChange = (event: any) => {
    setSelectedLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <StyledFormControl>
      <Select
        sx={{
          boxShadow: 'none',
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '.MuiSelect-icon': {
            right: '50px',
            top: 'calc(50% - .6em)',
            color: 'white',
          },
        }}
        labelId="language-label"
        id="language-dropdown"
        value={selectedLanguage}
        onChange={handleChange}
        renderValue={(selected) => (
          <div>{locales[selected as Locales].icon}</div>
        )}
      >
        {Object.entries(locales).map((locale, index) => (
          <MenuItem value={locale[0]} key={index}>
            <ListItemIcon>{locale[1].icon}</ListItemIcon>
            <Typography>{locale[1].title}</Typography>
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default LanguageDropdown;
