const Footer = () => {
  return (
    <footer
      className="footer shadow-lg flex gap-16 p-10 justify-center"
      style={{ width: "100vw" }}
    >
      <p className="text-2xl sm:text-3xl md:text-4xl flex flex-col font-bold">
        Trendify
        <span className="text-lg">Providing Clothes Since 2024</span>
      </p>
      <nav className="flex flex-col">
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">FAQ's</a>
      </nav>
      <nav className="flex flex-col">
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
