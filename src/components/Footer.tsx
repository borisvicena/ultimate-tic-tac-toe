interface Props {
  children: string;
}

const Footer = ({ children }: Props) => {
  return (
    // Fragment <>
    <>
      <footer className="footer">
        Developed by <a href="https://www.github.com/borisvicena">{children}</a>
      </footer>
    </>
  );
};

export default Footer;
