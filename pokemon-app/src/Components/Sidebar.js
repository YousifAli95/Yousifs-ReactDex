import "./CSS/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as SideBarStarSVG } from "../SVGs/SideBarStar.svg";
import { ReactComponent as HomeSVG } from "../SVGs/Home.svg";
import { ReactComponent as TwitterSVG } from "../SVGs/Twitter.svg";
import { ReactComponent as FacebookSVG } from "../SVGs/Facebook.svg";
import { ReactComponent as YoutubeSVG } from "../SVGs/Youtube.svg";
import { ReactComponent as RedditSVG } from "../SVGs/Reddit.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul className="navbar-ul">
          <Link to="/" reloadDocument>
            <li id="img-li" className="sidebar-li">
              <img
                id="pokemonball"
                src={require("./../Images/pokemonball.png")}
                alt=""
              />
            </li>
          </Link>
          {useLocation().pathname === "/" ? (
            <li className="sidebar-li">
              <SideBarStarSVG />
              <Link to="/favourites" className="sidebar-span">
                Favourite Pokemons
              </Link>
            </li>
          ) : (
            <li className="sidebar-li">
              <HomeSVG />
              <Link to="/" className="sidebar-span">
                <p>Home</p>
              </Link>
            </li>
          )}
          <li className="sidebar-li">
            <TwitterSVG />
            <a href="https://twitter.com/pokemon" className="sidebar-span">
              Pokemon Twitter
            </a>
          </li>
          <li className="sidebar-li">
            <FacebookSVG />
            <a
              href="https://web.facebook.com/Pokemon/?_rdc=1&_rdr"
              className="sidebar-span"
            >
              Pokemon Facebook
            </a>
          </li>
          <li className="sidebar-li">
            <YoutubeSVG />
            <a
              href="https://www.youtube.com/channel/UCFctpiB_Hnlk3ejWfHqSm6Q"
              className="sidebar-span"
            >
              Pokemon Youtube
            </a>
          </li>
          <li className="sidebar-li">
            <RedditSVG />
            <a
              href="https://www.reddit.com/r/pokemon/"
              className="sidebar-span"
            >
              Pokemon Reddit
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
