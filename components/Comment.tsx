import { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import useMount from '@/hooks/useMount';
import {
  commentDefaultConfig,
  commentThemeConfig,
} from '@/database/commentConfig';

function Comment() {
  const commentRef = useRef<HTMLDivElement>(null);
  const isMount = useMount();
  const { theme } = useTheme();

  const commentTheme =
    theme === 'dark' ? commentThemeConfig.darkTheme : commentThemeConfig.theme;

  useEffect(() => {
    if (isMount && commentRef.current) {
      // 기존에 존재하던 댓글 삭제 (테마 변화시)
      const existedComment = commentRef.current?.firstChild;
      if (existedComment) {
        commentRef.current.removeChild(existedComment);
      }

      // utterances 스크립트 생성
      const utterancesScript = document.createElement('script');
      Object.entries(commentDefaultConfig).forEach(([key, value]) => {
        utterancesScript.setAttribute(key, value);
      });
      utterancesScript.setAttribute('theme', commentTheme);

      commentRef.current.appendChild(utterancesScript);
    }

    return () => {
      // unmounted, 댓글 스타일 삭제
      if (isMount) document.querySelector('style')?.remove();
    };
  }, [commentTheme, isMount]);

  return <section className="comment" ref={commentRef}></section>;
}

export default Comment;
