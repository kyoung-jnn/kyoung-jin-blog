import siteConfig from "@/database/siteConfig";
// import SocialIcon from '@/components/icons';

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {/*  <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:''`} size={6} />
          <SocialIcon
            kind="github"
            href={siteConfig.author.contacts.github}
            size={6}
          />
        </div> */}
        <div className="mb-5 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteConfig.author.name}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
}
