import { Outlet } from 'react-router-dom';
import { TourProvider } from '@reactour/tour';
import { useTranslation } from 'react-i18next';

export const Class = () => {
  const { t } = useTranslation();
  const steps = [
    {
      selector: '.first-step',
      content: t('Fill information'),
    },
    {
      selector: '.second-step',
      content: t('Fill attendee condition and number'),
    },
    {
      selector: '.third-step',
      content: t('Pick started date'),
    },
    {
      selector: '.fourth-step',
      content: t('Go to next step'),
    },
  ];
  return (
    <>
      <TourProvider steps={steps}>
        <Outlet />
      </TourProvider>
    </>
  );
};
