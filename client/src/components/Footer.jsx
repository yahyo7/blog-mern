import { Footer } from "flowbite-react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-2xl sm:text-3xl font-semibold dark:text-white p-2 m-2"
            >
              <span className="px-3 py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-sky-blue dark:via-turquoise dark:to-sunflower">
                Seven&apos;s
              </span>
              Blog
            </Link>
          </div>

          <div className="flex flex-col gap-1 mt-4 sm:items-start sm:mt-6">
            <Footer.Title title="About" />
            <Footer.LinkGroup col>
              <Footer.Link href="/" target="_blank" rel="noopener noreferrer">
                Projects
              </Footer.Link>
              <Footer.Link href="/" target="_blank" rel="noopener noreferrer">
                Blog Posts
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div className="flex flex-col gap-1 mt-4 sm:items-start sm:mt-6">
            <Footer.Title title="Follow us" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://github.com/yahyo7"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Footer.Link>
              <Footer.Link
                href="https://www.linkedin.com/in/yakhyokhon/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div className="flex flex-col gap-1 mt-4 sm:items-start sm:mt-6">
            <Footer.Title title="Legacy" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Footer.Link>
              <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Yakhyokhon(Seven)"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={FaGithub} />
            <Footer.Icon href="#" icon={FaLinkedinIn} />
            <Footer.Icon href="#" icon={FaFacebookF} />
            <Footer.Icon href="#" icon={FaInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
