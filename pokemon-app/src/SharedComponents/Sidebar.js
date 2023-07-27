import "./CSS/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as SideBarStarSVG } from "../Assets//SVGs/SideBarStar.svg";
import { ReactComponent as HomeSVG } from "../Assets//SVGs/Home.svg";
import { ReactComponent as TwitterSVG } from "../Assets//SVGs/Twitter.svg";
import { ReactComponent as FacebookSVG } from "../Assets//SVGs/Facebook.svg";
import { ReactComponent as YoutubeSVG } from "../Assets//SVGs/Youtube.svg";
import { ReactComponent as RedditSVG } from "../Assets//SVGs/Reddit.svg";

const navLinks = [
  { icon: TwitterSVG, label: "Pokemon Twitter" },
  { icon: FacebookSVG, label: "Pokemon Facebook" },
  { icon: YoutubeSVG, label: "Pokemon Youtube" },
  { icon: RedditSVG, label: "Pokemon Reddit" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const linkLocation = pathname === "/" ? "/favourites" : "/";

  return (
    <div className="sidebar">
      <nav>
        <ul className="navbar-ul">
          <Link to="/" reloadDocument>
            <li id="img-li" className="sidebar-li">
              <img
                id="pokemonball"
                src={require("./../Assets/Images/pokemonball.png")}
                alt=""
              />
            </li>
          </Link>
          <li className="sidebar-li">
            <Link
              className="sidebar-a-href"
              to={pathname === "/" ? "/favourites" : "/"}
            >
              {pathname === "/" ? <SideBarStarSVG /> : <HomeSVG />}
              <span className="sidebar-span">
                {pathname === "/" ? "Favourite Pokemons" : "Home"}
              </span>
            </Link>
          </li>
          {navLinks.map(({ icon: Icon, label }) => (
            <li key={label} className="sidebar-li">
              <Link className="sidebar-a-href" to={linkLocation}>
                <Icon />
                <span className="sidebar-span">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
