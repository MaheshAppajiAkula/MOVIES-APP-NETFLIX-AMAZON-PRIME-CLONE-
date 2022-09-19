import {Link} from 'react-router-dom'

import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearchBar: false,
  }

  onClickViewSearch = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onClickViewMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  //   onClickHideMenu = () => {
  //     this.setState({showMenu: false})
  //   }

  onChangeSearchInput = event => {
    const {getSearchInput} = this.props
    if (event.key === 'Enter') {
      getSearchInput(event.target.value)
    }
  }

  render() {
    const {showMenu, showSearchBar} = this.state

    return (
      <nav className="nav-container">
        <div className="header-elements-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1662296727/Movies_Logo_vr3wvf.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="header-list-items">
            <Link to="/" className="comp-link">
              <li className="item-heading">Home</li>
            </Link>
            <Link to="/popular" className="comp-link">
              <li className="item-heading">Popular</li>
            </Link>
          </ul>
          <div className="search-container">
            {showSearchBar && (
              <input
                type="search"
                onKeyDown={this.onChangeSearchInput}
                placeholder="search"
                className="search"
              />
            )}
            <Link to="/search">
              <button
                type="button"
                className="search-btn"
                testid="searchButton"
              >
                <HiOutlineSearch
                  size={20}
                  color="white"
                  className="search-icon"
                  testid="searchButton"
                  onClick={this.onClickViewSearch}
                />
              </button>
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1663047636/Avatar_dhntyp.png"
                alt="profile"
                className="avatar-img"
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="white"
              className="menu-icon"
              onClick={this.onClickViewMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div>
            <ul className="screen-list">
              <Link to="/" className="comp-link">
                <li className="item-heading">Home</li>
              </Link>
              <Link to="/popular" className="comp-link">
                <li className="item-heading">Popular</li>
              </Link>
              <Link to="/account" className="comp-link">
                <li className="item-heading">Account</li>
              </Link>
              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.onClickViewMenu}
                className="cross-icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default Header
