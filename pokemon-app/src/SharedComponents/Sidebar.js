import "./CSS/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as SideBarStarSVG } from "../Assets//SVGs/SideBarStar.svg";
import { ReactComponent as HomeSVG } from "../Assets//SVGs/Home.svg";
import { ReactComponent as TwitterSVG } from "../Assets//SVGs/Twitter.svg";
import { ReactComponent as FacebookSVG } from "../Assets//SVGs/Facebook.svg";
import { ReactComponent as YoutubeSVG } from "../Assets//SVGs/Youtube.svg";
import { ReactComponent as RedditSVG } from "../Assets//SVGs/Reddit.svg";

export default function Sidebar() {
  const linkLocation = useLocation().pathname === "/" ? "/favourites" : "/";

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
          {useLocation().pathname === "/" ? (
            <li className="sidebar-li">
              <Link className="sidebar-a-href" to="/favourites">
                <SideBarStarSVG />
                <span className="sidebar-span">Favourite Pokemons</span>
              </Link>
            </li>
          ) : (
            <li className="sidebar-li">
              <Link className="sidebar-a-href" to="/">
                <HomeSVG />
                <span className="sidebar-span">Home</span>
              </Link>
            </li>
          )}
          <li className="sidebar-li">
            <Link className="sidebar-a-href" to={linkLocation}>
              <TwitterSVG />
              <span className="sidebar-span">Pokemon Twitter</span>
            </Link>
          </li>
          <li className="sidebar-li">
            <Link className="sidebar-a-href" to={linkLocation}>
              <FacebookSVG />
              <span className="sidebar-span">Pokemon Facebook</span>
            </Link>
          </li>
          <li className="sidebar-li">
            <Link className="sidebar-a-href" to={linkLocation}>
              <YoutubeSVG />
              <span className="sidebar-span">Pokemon Youtube</span>
            </Link>
          </li>
          <li className="sidebar-li">
            <Link className="sidebar-a-href" to={linkLocation}>
              <RedditSVG />
              <span
                href="https://www.reddit.com/r/pokemon/"
                className="sidebar-span"
              >
                Pokemon Reddit
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
