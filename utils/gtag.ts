import siteMetadata from '@/database/siteMetadata';

export const pageview = (url: string) => {
  /* window.gtag('config', siteMetadata.analytics.google, {
    page_path: url,
  }); */
};

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

// 특정 이벤트 감지시 사용
export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
