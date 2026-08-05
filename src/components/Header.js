import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import $ from 'jquery';

function Header() {

  const version = useSelector((state) => state.version.version)

  useEffect(() => {
    $(".header").fadeTo(300, 1)
  });

  return (
    <div className="header" style={{ opacity: 0.01 }}>
      <span className="title" id="globalTitle">DSE</span>
    </div>
  );
}

export default Header;